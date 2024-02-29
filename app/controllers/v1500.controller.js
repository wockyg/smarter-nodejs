const { request } = require("express");
const db = require("../models");
const V1500 = db.v1500;
const ReferralView = db.referralsView;
const Visit = db.dptBillingVisits;
const Lookup_cpt = db.lookup_cpt;
const V1500Rows = db.v1500Rows;
const Client = db.clients;
const Op = db.Sequelize.Op;

const {SensibleSDK} = require('sensible-api')
require('dotenv').config()

// Create and Save a new v1500
// exports.create = (req, res) => {

//   // Create new v1500
//   const v1500 = {
//     referralId: req.body.referralId,
//   };

//   // Save v1500 in the database
//   V1500.create(v1500)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the v1500."
//       });
//     });

// };

// Create and Save a new v1500 from python/nanonets upload
exports.uploadNanonets = (req, res) => {

    // get referralId using claimNumber
    const claimNumber = req.body.claim_number;
    const rows = req.body.rows;
    const today = new Date().toISOString();
    
    // console.log(req.file || "Nope...no file...");

    ReferralView.findAll({ where: { claimNumber: claimNumber, billingStatus: "Active" } })
    .then(referrals => {

        // if results array is empty, return error "no active referrals found for claim number"
        if (referrals.length === 0) {
            res.status(500).send({
                message: "No active referrals found with claim# " + claimNumber + "."
            });
            return;
        }

        let selectedClaim = referrals.length === 1 ? referrals[0] : null;

        // const temp = rows.sort((a, b) => {
        //                     if (a.dos === null){
        //                         return 1;
        //                     }
        //                     if (b.dos === null){
        //                         return -1;
        //                     }
        //                     if (a.dos === b.dos){
        //                         return 0;
        //                     }
        //                     return a.dos < b.dos ? -1 : 1;
        //                 });

        const temp = rows.sort((a, b) => {
                            if (a.service_to_date === null){
                                return 1;
                            }
                            if (b.service_to_date === null){
                                return -1;
                            }
                            if (a.service_to_date === b.service_to_date){
                                return 0;
                            }
                            return new Date(a.service_to_date) < new Date(b.service_to_date) ? -1 : 1;
                        });                

        const dos_array = temp?.map(r => r.dos);
        const uniqueDOS = Array.from(new Set(dos_array));
        const uniqueDOSReorder = uniqueDOS.map(x => `${x.substring(5,7)}-${x.substring(8,10)}-${x.substring(0,4)}`);
        
        // Create new v1500
        const v1500 = {
            method: 'nanonets',
            referralId: selectedClaim ? selectedClaim.referralId : null,
            physician_name: req.body.physician_name || (selectedClaim && `${selectedClaim.physicianFirst} ${selectedClaim.physicianLast}`) || null,
            physician_npi: req.body.physician_npi || (selectedClaim && `${selectedClaim.physicianNPI}`) || null,
            patient_account_no: req.body.patient_account_no || null,
            diagnosis_a: req.body.diagnosis[0] || null,
            diagnosis_b: req.body.diagnosis[1] || null,
            diagnosis_c: req.body.diagnosis[2] || null,
            diagnosis_d: req.body.diagnosis[3] || null,
            diagnosis_e: req.body.diagnosis[4] || null,
            diagnosis_f: req.body.diagnosis[5] || null,
            diagnosis_g: req.body.diagnosis[6] || null,
            diagnosis_h: req.body.diagnosis[7] || null,
            diagnosis_i: req.body.diagnosis[8] || null,
            diagnosis_j: req.body.diagnosis[9] || null,
            diagnosis_k: req.body.diagnosis[10] || null,
            diagnosis_l: req.body.diagnosis[11] || null,
            // d1500_filename: `${req.body.claimant} ADJ DOS ${uniqueDOS[0]}${uniqueDOS.length > 1 ? `, ${uniqueDOS[1]}` : ''}${uniqueDOS.length > 2 ? `, ${uniqueDOS[2]}` : ''}${uniqueDOS.length > 3 ? `, ${uniqueDOS[3]}` : ''}${uniqueDOS.length > 4 ? `, ${uniqueDOS[4]}` : ''}${uniqueDOS.length > 5 ? `, ${uniqueDOS[5]}` : ''}.pdf`,
            // v1500_filename: `${req.body.claimant} DOS ${uniqueDOS[0]}${uniqueDOS.length > 1 ? `, ${uniqueDOS[1]}` : ''}${uniqueDOS.length > 2 ? `, ${uniqueDOS[2]}` : ''}${uniqueDOS.length > 3 ? `, ${uniqueDOS[3]}` : ''}${uniqueDOS.length > 4 ? `, ${uniqueDOS[4]}` : ''}${uniqueDOS.length > 5 ? `, ${uniqueDOS[5]}` : ''}.pdf`,
            original_dos: `${uniqueDOS[0]}${uniqueDOS.length > 1 ? `, ${uniqueDOS[1]}` : ''}${uniqueDOS.length > 2 ? `, ${uniqueDOS[2]}` : ''}${uniqueDOS.length > 3 ? `, ${uniqueDOS[3]}` : ''}${uniqueDOS.length > 4 ? `, ${uniqueDOS[4]}` : ''}${uniqueDOS.length > 5 ? `, ${uniqueDOS[5]}` : ''}`
        };

        // Insert v1500 in the database
        V1500.create(v1500)
            .then(new_v1500 => {

                // insert cpt rows in database
                Promise.all(
                    rows.map((row => {
                        // append hcfaId to payload object
                        const values = {
                            v1500Id: new_v1500.v1500Id, 
                            // ...row,
                            dos: row.service_to_date || row.dos || null,
                            pos: row.pos || '11',
                            cpt: row.cpt || null,
                            mod1: row.mods[0] || null,
                            mod2: row.mods[1] || null,
                            mod3: row.mods[2] || null,
                            mod4: row.mods[3] || null,
                            diag: row.diag || null,
                            units: row.units || null,
                            charges: row.charges || null,
                            provider_npi: row.provider_npi || null

                        };
                        // insert row data into DB
                        return V1500Rows.create(values);
                    }))
                ).then(rowsResponse => {
                    // if only single referral, update v1500 field in dptBillingVisits for each DOS 
                    if (selectedClaim) {
                        Promise.all(
                            uniqueDOS.map(d => {
                                return Visit.update({v1500: today}, {where: {referralId: selectedClaim.referralId, dos: d}})
                            })
                        )
                        .then(billingUpdateResponse => {
                            // TODO check if physician NPI exists and update physician if not
                            // TODO check if patient account # exists and update physician if not
                            res.send({message: "v1500 successfully uploaded with referralId.", filename: new_v1500.v1500_filename})
                        })
                        .catch(err => {
                            // TODO delete v1500 entry and all associated rows???
                            // 
                            res.status(500).send({
                                message: "Some error occurred while updating the billing table: " + err
                            });
                        });   
                    }
                    else {
                        // 
                        res.send({message: "v1500 successfully uploaded without referralId."})
                    }
                })
                .catch(err => {
                    // TODO delete v1500 entry and all associated rows
                    // 
                    res.status(500).send({
                        message: "Some error occurred while creating the rows: " + err
                    });
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Some error occurred while submitting the v1500: " + err
                });
            });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving referrals with claim# " + claimNumber + ". Error: " + err
        });
    });
};

// Create and Save a new v1500 from python/sensible upload
exports.uploadSensible = (req, res) => {

    // validate request body
    // make sure req.body.insureds_id_number is not null
    // make sure rows.length is not null > 0
    // make sure each dos is a date
    // 

    // get referralId using claimNumber
    const claimNumber = req.body.insureds_id_number;
    const rows = req.body.rows;
    const today = new Date().toISOString();
    
    // console.log(req.file || "Nope...no file...");

    ReferralView.findAll({ where: { claimNumber: claimNumber, billingStatus: "Active" } })
    .then(referrals => {

        // if results array is empty, return error "no active referrals found for claim number"
        if (referrals.length === 0) {
            res.status(500).send({
                message: "No active referrals found with claim# " + claimNumber + ".",
                filename: null
            });
            return;
        }

        let selectedClaim = referrals.length === 1 ? referrals[0] : null;

        const temp = rows.sort((a, b) => {
                            if (a.dos === null){
                                return 1;
                            }
                            if (b.dos === null){
                                return -1;
                            }
                            if (a.dos === b.dos){
                                return 0;
                            }
                            return a.dos < b.dos ? -1 : 1;
                        });

        const dos_array = temp?.map(r => `${(new Date(r.dos).getMonth() + 1) < 10 ? `0${new Date(r.dos).getMonth() + 1}` : `${new Date(r.dos).getMonth() + 1}`}-${(new Date(r.dos).getDate() + 1) < 10 ? `0${new Date(r.dos).getDate() + 1}` : `${new Date(r.dos).getDate() + 1}`}-${new Date(r.dos).getFullYear()}`);
        const uniqueDOS = Array.from(new Set(dos_array));
        const v1500_filename = `${referrals[0].claimant} DOS ${uniqueDOS[0]}${uniqueDOS.length > 1 ? `, ${uniqueDOS[1]}` : ''}${uniqueDOS.length > 2 ? `, ${uniqueDOS[2]}` : ''}${uniqueDOS.length > 3 ? `, ${uniqueDOS[3]}` : ''}${uniqueDOS.length > 4 ? `, ${uniqueDOS[4]}` : ''}${uniqueDOS.length > 5 ? `, ${uniqueDOS[5]}` : ''}.pdf`
        const d1500_filename = `${referrals[0].claimant} ADJ DOS ${uniqueDOS[0]}${uniqueDOS.length > 1 ? `, ${uniqueDOS[1]}` : ''}${uniqueDOS.length > 2 ? `, ${uniqueDOS[2]}` : ''}${uniqueDOS.length > 3 ? `, ${uniqueDOS[3]}` : ''}${uniqueDOS.length > 4 ? `, ${uniqueDOS[4]}` : ''}${uniqueDOS.length > 5 ? `, ${uniqueDOS[5]}` : ''}.pdf`
        const original_dos = `${uniqueDOS[0]}${uniqueDOS.length > 1 ? `, ${uniqueDOS[1]}` : ''}${uniqueDOS.length > 2 ? `, ${uniqueDOS[2]}` : ''}${uniqueDOS.length > 3 ? `, ${uniqueDOS[3]}` : ''}${uniqueDOS.length > 4 ? `, ${uniqueDOS[4]}` : ''}${uniqueDOS.length > 5 ? `, ${uniqueDOS[5]}` : ''}`

        // Create new v1500
        const v1500 = {
            method: 'sensible',
            referralId: selectedClaim ? selectedClaim.referralId : null,
            physician_name: req.body.name_of_referring_provider || null,
            physician_npi: req.body.referring_provider_npi || null,
            patient_account_no: req.body.patients_account_number || null,
            diagnosis_a: req.body.diagnosis[0] || null,
            diagnosis_b: req.body.diagnosis[1] || null,
            diagnosis_c: req.body.diagnosis[2] || null,
            diagnosis_d: req.body.diagnosis[3] || null,
            diagnosis_e: req.body.diagnosis[4] || null,
            diagnosis_f: req.body.diagnosis[5] || null,
            diagnosis_g: req.body.diagnosis[6] || null,
            diagnosis_h: req.body.diagnosis[7] || null,
            diagnosis_i: req.body.diagnosis[8] || null,
            diagnosis_j: req.body.diagnosis[9] || null,
            diagnosis_k: req.body.diagnosis[10] || null,
            diagnosis_l: req.body.diagnosis[11] || null,
            d1500_filename: d1500_filename,
            v1500_filename: v1500_filename,
            original_dos: original_dos
        };

        // Insert v1500 in the database
        V1500.create(v1500)
            .then(new_v1500 => {

                // insert cpt rows in database
                Promise.all(
                    rows.map((row => {
                        // append hcfaId to payload object
                        const values = {
                            v1500Id: new_v1500.v1500Id, 
                            dos: row.dos || null,
                            pos: row.pos || '11',
                            cpt: row.cpt || null,
                            mod1: row.mods[0] || null,
                            mod2: row.mods[1] || null,
                            mod3: row.mods[2] || null,
                            mod4: row.mods[3] || null,
                            diag: row.diag || null,
                            units: row.units || null,
                            charges: row.charges || null,
                            provider_npi: row.provider_npi || null
                        };
                        // insert row data into DB
                        return V1500Rows.create(values);
                    }))
                ).then(rowsResponse => {
                    // if only single referral, update v1500 field in dptBillingVisits for each DOS 
                    if (selectedClaim) {
                        Promise.all(
                            uniqueDOS.map(d => {
                                return Visit.update({v1500: today}, {where: {referralId: selectedClaim.referralId, dos: d}})
                            })
                        )
                        .then(billingUpdateResponse => {
                            // TODO? check if physician NPI exists and update physician if not
                            // TODO? check if patient account # exists and update physician if not
                            res.send({message: "v1500 successfully uploaded with referralId.", filename: v1500_filename})
                        })
                        .catch(err => {
                            // TODO delete v1500 entry and all associated rows???
                            // 
                            res.status(500).send({
                                message: "Some error occurred while updating the billing table: " + err, filename: null
                            });
                        });   
                    }
                    else {
                        // 
                        res.send({message: "v1500 successfully uploaded without referralId.", filename: v1500_filename})
                    }
                })
                .catch(err => {
                    // TODO delete v1500 entry and all associated rows
                    // 
                    res.status(500).send({
                        message: "Some error occurred while creating the rows: " + err
                    });
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Some error occurred while submitting the v1500: " + err
                });
            });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving referrals with claim# " + claimNumber + ". Error: " + err
        });
    });
};

// Upload and Extract a new v1500 using smarter client
exports.uploadSmarter = async (req, res) => {

    // TEST CODE
    // console.warn(req.files);
    // res.status(200).send({message: `Voila! ${req.files.length || 'Noooooooo'} files uploaded`});
    // ----------

    // validate request body
    // make sure req.body.insureds_id_number is not null
    // make sure rows.length is not null > 0
    // make sure each dos is a date
    // 

    // Post to Sensible
    const sensible = new SensibleSDK(process.env.SENSIBLE_API_KEY);

    try {
        const request = await Promise.all(
            req.files.map(file => {
                const filepath = file.path
                return sensible.extract({
                    path: filepath,
                    documentType: "cms_1500_sensible_demo",
                    configurationName: "02_12",
                    environment: "production",
                    documentName: file.originalname,
                    webhook: {
                        url:"https://smarter-nodejs.onrender.com/api/v1500/webhook/sensible",
                        // payload: "additional info, for example, a UUID for verification",
                    }
                });
            })
        )
        // const data = await request.json();
        // return data;
        console.log(request)
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }

    // res.send(request);
    res.status(200).send({message: "success..."});

    // get referralId using claimNumber
    // const claimNumber = req.body.insureds_id_number;
    // const rows = req.body.rows;
    // const today = new Date().toISOString();
    
    // // console.log(req.file || "Nope...no file...");

    // ReferralView.findAll({ where: { claimNumber: claimNumber, billingStatus: "Active" } })
    // .then(referrals => {

    //     // if results array is empty, return error "no active referrals found for claim number"
    //     if (referrals.length === 0) {
    //         res.status(500).send({
    //             message: "No active referrals found with claim# " + claimNumber + ".",
    //             filename: null
    //         });
    //         return;
    //     }

    //     let selectedClaim = referrals.length === 1 ? referrals[0] : null;

    //     const temp = rows.sort((a, b) => {
    //                         if (a.dos === null){
    //                             return 1;
    //                         }
    //                         if (b.dos === null){
    //                             return -1;
    //                         }
    //                         if (a.dos === b.dos){
    //                             return 0;
    //                         }
    //                         return a.dos < b.dos ? -1 : 1;
    //                     });

    //     const dos_array = temp?.map(r => `${(new Date(r.dos).getMonth() + 1) < 10 ? `0${new Date(r.dos).getMonth() + 1}` : `${new Date(r.dos).getMonth() + 1}`}-${(new Date(r.dos).getDate() + 1) < 10 ? `0${new Date(r.dos).getDate() + 1}` : `${new Date(r.dos).getDate() + 1}`}-${new Date(r.dos).getFullYear()}`);
    //     const uniqueDOS = Array.from(new Set(dos_array));
    //     const v1500_filename = `${referrals[0].claimant} DOS ${uniqueDOS[0]}${uniqueDOS.length > 1 ? `, ${uniqueDOS[1]}` : ''}${uniqueDOS.length > 2 ? `, ${uniqueDOS[2]}` : ''}${uniqueDOS.length > 3 ? `, ${uniqueDOS[3]}` : ''}${uniqueDOS.length > 4 ? `, ${uniqueDOS[4]}` : ''}${uniqueDOS.length > 5 ? `, ${uniqueDOS[5]}` : ''}.pdf`
    //     const d1500_filename = `${referrals[0].claimant} ADJ DOS ${uniqueDOS[0]}${uniqueDOS.length > 1 ? `, ${uniqueDOS[1]}` : ''}${uniqueDOS.length > 2 ? `, ${uniqueDOS[2]}` : ''}${uniqueDOS.length > 3 ? `, ${uniqueDOS[3]}` : ''}${uniqueDOS.length > 4 ? `, ${uniqueDOS[4]}` : ''}${uniqueDOS.length > 5 ? `, ${uniqueDOS[5]}` : ''}.pdf`
    //     const original_dos = `${uniqueDOS[0]}${uniqueDOS.length > 1 ? `, ${uniqueDOS[1]}` : ''}${uniqueDOS.length > 2 ? `, ${uniqueDOS[2]}` : ''}${uniqueDOS.length > 3 ? `, ${uniqueDOS[3]}` : ''}${uniqueDOS.length > 4 ? `, ${uniqueDOS[4]}` : ''}${uniqueDOS.length > 5 ? `, ${uniqueDOS[5]}` : ''}`

    //     // Create new v1500
    //     const v1500 = {
    //         method: 'sensible',
    //         referralId: selectedClaim ? selectedClaim.referralId : null,
    //         physician_name: req.body.name_of_referring_provider || null,
    //         physician_npi: req.body.referring_provider_npi || null,
    //         patient_account_no: req.body.patients_account_number || null,
    //         diagnosis_a: req.body.diagnosis[0] || null,
    //         diagnosis_b: req.body.diagnosis[1] || null,
    //         diagnosis_c: req.body.diagnosis[2] || null,
    //         diagnosis_d: req.body.diagnosis[3] || null,
    //         diagnosis_e: req.body.diagnosis[4] || null,
    //         diagnosis_f: req.body.diagnosis[5] || null,
    //         diagnosis_g: req.body.diagnosis[6] || null,
    //         diagnosis_h: req.body.diagnosis[7] || null,
    //         diagnosis_i: req.body.diagnosis[8] || null,
    //         diagnosis_j: req.body.diagnosis[9] || null,
    //         diagnosis_k: req.body.diagnosis[10] || null,
    //         diagnosis_l: req.body.diagnosis[11] || null,
    //         d1500_filename: d1500_filename,
    //         v1500_filename: v1500_filename,
    //         original_dos: original_dos
    //     };

    //     // Insert v1500 in the database
    //     V1500.create(v1500)
    //         .then(new_v1500 => {

    //             // insert cpt rows in database
    //             Promise.all(
    //                 rows.map((row => {
    //                     // append hcfaId to payload object
    //                     const values = {
    //                         v1500Id: new_v1500.v1500Id, 
    //                         dos: row.dos || null,
    //                         pos: row.pos || '11',
    //                         cpt: row.cpt || null,
    //                         mod1: row.mods[0] || null,
    //                         mod2: row.mods[1] || null,
    //                         mod3: row.mods[2] || null,
    //                         mod4: row.mods[3] || null,
    //                         diag: row.diag || null,
    //                         units: row.units || null,
    //                         charges: row.charges || null,
    //                         provider_npi: row.provider_npi || null
    //                     };
    //                     // insert row data into DB
    //                     return V1500Rows.create(values);
    //                 }))
    //             ).then(rowsResponse => {
    //                 // if only single referral, update v1500 field in dptBillingVisits for each DOS 
    //                 if (selectedClaim) {
    //                     Promise.all(
    //                         uniqueDOS.map(d => {
    //                             return Visit.update({v1500: today}, {where: {referralId: selectedClaim.referralId, dos: d}})
    //                         })
    //                     )
    //                     .then(billingUpdateResponse => {
    //                         // TODO? check if physician NPI exists and update physician if not
    //                         // TODO? check if patient account # exists and update physician if not
    //                         res.send({message: "v1500 successfully uploaded with referralId.", filename: v1500_filename})
    //                     })
    //                     .catch(err => {
    //                         // TODO delete v1500 entry and all associated rows???
    //                         // 
    //                         res.status(500).send({
    //                             message: "Some error occurred while updating the billing table: " + err, filename: null
    //                         });
    //                     });   
    //                 }
    //                 else {
    //                     // 
    //                     res.send({message: "v1500 successfully uploaded without referralId.", filename: v1500_filename})
    //                 }
    //             })
    //             .catch(err => {
    //                 // TODO delete v1500 entry and all associated rows
    //                 // 
    //                 res.status(500).send({
    //                     message: "Some error occurred while creating the rows: " + err
    //                 });
    //             });
    //         })
    //         .catch(err => {
    //             res.status(500).send({
    //                 message: "Some error occurred while submitting the v1500: " + err
    //             });
    //         });
    // })
    // .catch(err => {
    //     res.status(500).send({
    //         message: "Error retrieving referrals with claim# " + claimNumber + ". Error: " + err
    //     });
    // });
};

// Webhook for receiving new Sensible v1500 extractions
exports.webhookSensible = async (req, res) => {

    // respond to service promptly
    res.status(200).send();

    console.warn("New extraction received...")

    const {parsed_document: parsed, document_name: filename, page_count, status} = req.body

    if (status === 'FAILED') {
        console.log("Extraction failed...")
        console.log("Moving file to Fail foler...")
        // move file to Fail(extraction) folder
        return
    }
    

    // validate request body:

    // -make sure req.body.insureds_id_number_1/2/3 is not null
    // -make sure rows.length is not null, > 0
    // -make sure each dos is a date
    // make sure each row contains dos, cpt, unit, npi

    // if any of the above fail, move file to fail folder and return (for now)

    if (!parsed.box_24 || parsed.box_24.length == 0 ) {
        console.log("No cpt rows in response...")
        console.log("Moving file to Fail foler...")
        // move file to Fail(sanitization) folder
        return
    }

    parsed.box_24.forEach((cpt_row, i) => {
        if (!(new Date(cpt_row['a.dates_of_service.from']).getMonth())) {
            console.log(`Row ${i+1} error...`)
            console.log("Can't resolve dos into new Date()...")
            console.log("Moving file to Fail foler...")
            // move file to Fail(sanitization) folder
            return
        }
    })

    console.warn("Parsing response...")
    console.warn("...................")
    console.warn("filename:", filename)
    console.warn("page_count:", page_count)

    const values = []
    const rows = []
    const diags = []


    Object.keys(parsed).forEach(key => {
        // main boxes
        if (key !== 'box_24' && key !== 'diagnosis_codes' && parsed[key] !== null) {
            values[key] = parsed[key].value
        }
        // icd10 codes
        else if(key === 'diagnosis_codes' && parsed[key] !== null) {
            parsed[key].forEach(code => {
                // if code contains a space
                if (code.value.includes(' ')) {
                    // split by space
                    const jumble = code.value.split(' ')
                    if (jumble.length === 2) {
                        // check which side is longer
                        let longestLength = 0, longestValue = null
                        for (let i = 0; i < jumble.length; i++) {                            
                            const value = jumble[i];
                            const valueLength = value.length;
                            if (valueLength > longestLength)
                            {
                                longestLength = valueLength;
                                longestValue = value;
                            }
                        }
                        // Append longer side, ignore shorter side
                        diags.push(longestValue);
                    }
                    else {
                        console.log("ERROR!! more than one space in the icd10 code")
                    }
                }
                else {
                    diags.push(code.value)
                }
            })
        }
        // cpt rows
        else if(key === 'box_24' && parsed[key] !== null) {
            parsed[key].forEach(row => {
                const addRow = {}
                if (row['a.dates_of_service.from'] !== null) {
                    Object.keys(row).forEach(key => {
                        if (key === 'a.dates_of_service.from') {
                            addRow.dos = row[key].value
                        }
                        else if (key === 'b.place_of_service') {
                            addRow.pos = row[key].value
                        }
                        else if (key === 'b.procedures_services_or_supplies') {
                            if (row[key].value.includes(' ')) {
                                // theres a space in the cpt code
                                // const jumble = row[key].value.split(' ')
                                const fullText = row[key].value
                                const indexSpace = fullText.indexOf(" ")
                                const cpt = fullText.slice(0, indexSpace)
                                const mods = fullText.slice(indexSpace+1).split(' ')
                                addRow.cpt = cpt
                                addRow.mods = mods
                            }
                            else {
                                addRow.cpt = row[key].value
                            }
                        }
                        else if (key === 'e.diagnosis_pointer') {
                            addRow.diag = row[key].value
                        }
                        else if (key === 'g.days_or_units') {
                            addRow.units = row[key].value
                        }
                        else if (key === 'j.rendering_provider_id.npi') {
                            addRow.provider_npi = row[key].value
                        }
                        
                    })
                    rows.push(addRow)
                }
            })
        }
        
    })

    // console.log(parsed);
    console.warn("Response parsed...")
    console.warn("...................")
    console.warn("values...")
    console.warn("-------------------")
    console.log(values)
    console.warn("...................")
    console.warn("diags...")
    console.warn("-------------------")
    console.log(diags)
    console.warn("...................")
    console.warn("rows...")
    console.warn("-------------------")
    console.log(rows)
    console.warn("...................")
    console.warn("Checking claim_number for matches...")
    console.warn("...................")
    

    // get referralId using claimNumber
    const claim_number = parsed.insureds_id_number.value;
    // const today = new Date().toISOString();

    // check for matches in referral table
    const matches = await ReferralView.findAll({ where: { claimNumber: claim_number, billingStatus: "Active" } })

    console.warn(matches.length + " match(es)...")
    console.warn("...................")

    // if no matches, check against 2nd claim# field
        // if still no matches, check against 3rd claim# field
            // if still no matches, check against claimant name
                // if still no matches, return status 400 bad request

    const selectedClaim = matches.length === 1 ? matches[0] : null;

    const temp = rows.sort((a, b) => {
                        if (a.dos === null){
                            return 1;
                        }
                        if (b.dos === null){
                            return -1;
                        }
                        if (a.dos === b.dos){
                            return 0;
                        }
                        return a.dos < b.dos ? -1 : 1;
                    });

    const dos_array = temp?.map(r => `${(new Date(r.dos).getMonth() + 1) < 10 ? `0${new Date(r.dos).getMonth() + 1}` : `${new Date(r.dos).getMonth() + 1}`}-${(new Date(r.dos).getDate() + 1) < 10 ? `0${new Date(r.dos).getDate() + 1}` : `${new Date(r.dos).getDate() + 1}`}-${new Date(r.dos).getFullYear()}`);
    const uniqueDOS = Array.from(new Set(dos_array));
    const uniqueDOSString = `${uniqueDOS[0]}${uniqueDOS.length > 1 ? `, ${uniqueDOS[1]}` : ''}${uniqueDOS.length > 2 ? `, ${uniqueDOS[2]}` : ''}${uniqueDOS.length > 3 ? `, ${uniqueDOS[3]}` : ''}${uniqueDOS.length > 4 ? `, ${uniqueDOS[4]}` : ''}${uniqueDOS.length > 5 ? `, ${uniqueDOS[5]}` : ''}` 
    const v1500_filename = matches.length > 0 ? `${matches[0].claimant} DOS ${uniqueDOSString}.pdf` : null
    const d1500_filename = matches.length > 0 ? `${matches[0].claimant} ADJ DOS ${uniqueDOSString}.pdf` : null

    // Create new v1500
    const v1500 = {
        method: 'sensible',
        referralId: selectedClaim ? selectedClaim.referralId : null,
        claim_number: claim_number || null,
        physician_name: values.name_of_referring_provider || null,
        physician_npi: values.referring_provider_npi || null,
        patient_account_no: values.patients_account_number || null,
        diagnosis_a: diags[0] || null,
        diagnosis_b: diags[1] || null,
        diagnosis_c: diags[2] || null,
        diagnosis_d: diags[3] || null,
        diagnosis_e: diags[4] || null,
        diagnosis_f: diags[5] || null,
        diagnosis_g: diags[6] || null,
        diagnosis_h: diags[7] || null,
        diagnosis_i: diags[8] || null,
        diagnosis_j: diags[9] || null,
        diagnosis_k: diags[10] || null,
        diagnosis_l: diags[11] || null,
        d1500_filename: d1500_filename,
        v1500_filename: v1500_filename,
        original_filename: filename,
        original_dos: uniqueDOSString,
        num_matches: matches.length

    };

    console.warn("Posting to SMARTer...")
    console.warn("...................")

    // Insert v1500 in the database
    const newV1500 = await V1500.create(v1500)

    // console.log(newV1500);

    // insert cpt rows in database
    const newRows = await Promise.all(
        rows.map((row => {
            // append hcfaId to payload object
            const values = {
                v1500Id: newV1500.v1500Id, 
                dos: row.dos || null,
                pos: row.pos || '11',
                cpt: row.cpt || null,
                mod1: row.mods[0] || null,
                mod2: row.mods[1] || null,
                mod3: row.mods[2] || null,
                mod4: row.mods[3] || null,
                diag: row.diag || null,
                units: row.units || null,
                charges: row.charges || null,
                provider_npi: row.provider_npi || null
            };
            // insert row data into DB
            return V1500Rows.create(values);
        }))
    )

    // console.log(newRows);

    let payload = {}

    // if only single referral, update v1500 field in dptBillingVisits for each DOS 
    if (selectedClaim) {
        payload = {message: "v1500 successfully uploaded with referralId.", filename: v1500_filename}
        // Promise.all(
        //     uniqueDOS.map(d => {
        //         return Visit.update({v1500: today}, {where: {referralId: selectedClaim.referralId, dos: d}})
        //     })
        // )
        // .then(num => {
        //     const payload = {message: "v1500 successfully uploaded with referralId.", filename: v1500_filename}
        //     // TODO? check if physician NPI exists and update physician if not
        //     // TODO? check if patient account # exists and update physician if not
        // })
        // .catch(err => {
        //     const payload = {message: "Some error occurred while updating the billing table: " + err, filename: null}
        //     // 
        //     // 
        // });   
    }
    else {
        payload = {message: "v1500 successfully uploaded without referralId.", filename: v1500_filename}
    }

    console.log(payload)
    console.log("Moving file to Inbound...")
    console.warn("...................")
    console.warn("Done...")

};

// Retrieve all v1500s from the database.
exports.findAll = (req, res) => {

    V1500.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving v1500s."
        });
        });
  
};

// Update an v1500 by the id in the request
exports.updateUpload = (req, res) => {
    const id = req.params.id;
    const today = new Date().toISOString();

    V1500.update(req.body, {
        where: { hcfaId: id }
    })
        .then(num => {
        if (num == 1) {
            // find all rows for hcfaId
            V1500Rows.findall({
                attributes: ['dos'],
                where: {hcfaId: id}
            })
            .then(rows => {
                // filter into uniqueDos array
                const dos_array = rows?.map(r => r.dos);
                const uniqueDOS = Array.from(new Set(dos_array));
                // update billing rows
                Promise.all(
                    uniqueDOS.map(d => {
                        return Visit.update({v1500: today}, {where: {referralId: req.body.referralId, dos: d}})
                    })
                )
                .then(result => {
                    res.send({
                    message: "v1500 was updated successfully."
                    });
                })
                .catch(err => {res.status(500).send({
                        message: "Error updating billing rows"
                    });
                });
            })
            .catch(err => {res.status(500).send({
                    message: "Error finding v1500 rows"
                });
            });

        } else {
            res.send({
            message: `Cannot update v1500 with id=${id}. Maybe v1500 was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating v1500 with id=" + id
        });
        });
};

// Update an v1500 by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    V1500.update(req.body, {
        where: { hcfaId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "v1500 was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update v1500 with id=${id}. Maybe v1500 was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating v1500 with id=" + id
        });
        });
};

// Delete a v1500 with the specified id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

    V1500.destroy({
        where: { hcfaId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "v1500 was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete v1500 with id=${id}. Maybe v1500 was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error deleting v1500 with id=" + id
        });
        });
};