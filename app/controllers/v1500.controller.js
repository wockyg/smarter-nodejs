const db = require("../models");
const V1500 = db.v1500;
const ReferralView = db.referralsView;
const Visit = db.dptBillingVisits;
const Lookup_cpt = db.lookup_cpt;
const V1500Rows = db.v1500Rows;
const Client = db.clients;
const Op = db.Sequelize.Op;


// Create and Save a new d1500
// exports.create = (req, res) => {

//   // Create new d1500
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

// Create and Save a new v1500 from python upload
exports.upload = (req, res) => {

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

        const dos_array = temp?.map(r => r.dos);
        const uniqueDOS = Array.from(new Set(dos_array));
        const uniqueDOSReorder = uniqueDOS.map(x => `${x.substring(5,7)}-${x.substring(8,10)}-${x.substring(0,4)}`);
        
        // Create new v1500
        const v1500 = {
            method: 'python',
            referralId: selectedClaim ? selectedClaim.referralId : null,
            physician_name: req.body.physician_name || null,
            physician_npi: req.body.physician_npi || null,
            patient_account_no: req.body.patient_account_no || null,
            diagnosis_a: req.body.diagnosis_a || null,
            diagnosis_b: req.body.diagnosis_b || null,
            diagnosis_c: req.body.diagnosis_c || null,
            diagnosis_d: req.body.diagnosis_d || null,
            diagnosis_e: req.body.diagnosis_e || null,
            diagnosis_f: req.body.diagnosis_f || null,
            diagnosis_g: req.body.diagnosis_g || null,
            diagnosis_h: req.body.diagnosis_h || null,
            diagnosis_i: req.body.diagnosis_i || null,
            diagnosis_j: req.body.diagnosis_j || null,
            diagnosis_k: req.body.diagnosis_k || null,
            diagnosis_l: req.body.diagnosis_l || null,
            d1500_filename: `${req.body.claimant} ADJ DOS ${uniqueDOS[0]}${uniqueDOS.length > 1 ? `, ${uniqueDOS[1]}` : ''}${uniqueDOS.length > 2 ? `, ${uniqueDOS[2]}` : ''}${uniqueDOS.length > 3 ? `, ${uniqueDOS[3]}` : ''}${uniqueDOS.length > 4 ? `, ${uniqueDOS[4]}` : ''}${uniqueDOS.length > 5 ? `, ${uniqueDOS[5]}` : ''}.pdf`,
            v1500_filename: `${req.body.claimant} DOS ${uniqueDOS[0]}${uniqueDOS.length > 1 ? `, ${uniqueDOS[1]}` : ''}${uniqueDOS.length > 2 ? `, ${uniqueDOS[2]}` : ''}${uniqueDOS.length > 3 ? `, ${uniqueDOS[3]}` : ''}${uniqueDOS.length > 4 ? `, ${uniqueDOS[4]}` : ''}${uniqueDOS.length > 5 ? `, ${uniqueDOS[5]}` : ''}.pdf`,
            original_dos: `${uniqueDOS[0]}${uniqueDOS.length > 1 ? `, ${uniqueDOS[1]}` : ''}${uniqueDOS.length > 2 ? `, ${uniqueDOS[2]}` : ''}${uniqueDOS.length > 3 ? `, ${uniqueDOS[3]}` : ''}${uniqueDOS.length > 4 ? `, ${uniqueDOS[4]}` : ''}${uniqueDOS.length > 5 ? `, ${uniqueDOS[5]}` : ''}`
        };

        // Insert v1500 in the database
        V1500.create(v1500)
            .then(new_v1500 => {

                // insert cpt rows in database
                Promise.all(
                    rows.map((row => {
                        // append hcfaId to payload object
                        const values = {v1500Id: new_v1500.v1500Id, ...row};
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
                            res.send({message: "v1500 successfully uploaded with referralId."})
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