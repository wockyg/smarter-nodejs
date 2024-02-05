// const { google } = require('googleapis');
const fs = require('fs-extra');
const db = require("../models");
const googledrive = require('../../GoogleDriveAPI');
const pdfco = require('../../PDFcoAPI');


const D1500 = db.d1500;
const ReferralView = db.referralsView;
const Visit = db.dptBillingVisits;
const Lookup_cpt = db.lookup_cpt;
const D1500Rows = db.d1500Rows;
const V1500 = db.v1500;
const Op = db.Sequelize.Op;

// const util = require('util')
// const unlinkFile = util.promisify(fs.unlink)


// Create and Save a new d1500
exports.create = (req, res) => {

    const { v1500_filename, d1500_filename } = req.body;

    const folderId_inbound = '17TgrR79PGv6I5AnwYJU-M9hfkkqWxwa4'; // BillMachineIn folder in SharedDrive

    // console.warn(req.file);

    console.log(`......... D1500 submitted: ${d1500_filename} .........`)

    // authorize googledrive
    googledrive.authorize()
    .then((token) => {
        console.log("Authorized..........");
        // locate matching V1500
        console.log("searching for matching V1500..........");
        googledrive.getFile(token, folderId_inbound, v1500_filename)
        .then(path => {
            // if V1500 match found, upload temp file and extract notes
            if (path) {
                console.log("Match found..........");
                console.log("Uploading V1500 as temp file to pdf.co..........");
                console.log("Uploading D1500 as temp file to pdf.co..........");
                // upload temp files to pdf.co
                Promise.all([
                    pdfco.uploadTempFile(path), // v1500
                    pdfco.uploadTempFile(req.file.path) // d1500
                ])
                .then(urls => {
                    console.log("V1500 Temp file uploaded to PDF.co: ", v1500_filename);
                    console.log("D1500 Temp file uploaded to PDF.co: ", d1500_filename);
                    console.log("Splitting visit notes from V1500..........");
                    // extract notes from V1500
                    pdfco.splitPDF(urls[0], '1,2-', true, `notes_${v1500_filename}`, false)
                    .then(split => {
                        console.log("Notes split..........");
                        console.log("Merging notes with D1500..........");
                        // merge notes with D1500
                        pdfco.mergePDF(`${urls[1]},${split.data.urls[1]}`, d1500_filename)
                        .then(merge => {
                            console.log("Notes merged..........");
                            // console.log(merge);
                            console.log("Saving D1500 to outbound..........");
                            googledrive.uploadFile(token, d1500_filename, '', req.file.path)

                            console.log("Moving V1500 to ????????..........");

                            // console.log("Unlinking local files..........");
                            // console.log(req.file.path);
                            // console.log(path);
                            // Promise.all([
                            //     fs.unlink(path),
                            //     fs.unlink(req.file.path)
                            // ])
                            // .then(res => {
                            //     console.log("Local V1500 file unlinked..........");
                            //     console.log("Local D1500 file unlinked..........");
                            //     console.log(res);
                            // }).catch(err => console.log("Unlink Failed......", err))
                        }).catch(err => console.log("Merge Failed......", err))
                    })
                }).catch(err => console.log("Split Failed......", err))
            }
        }).catch(err => console.log("No Match Found......", err))
    }).catch(err => console.log("Not Authorized..........", err))
    
    // merge notes with D1500

    // move V1500 to _____ folder

    // save new D1500 to Outbound folder

  // Create new d1500 object
  const d1500 = {
    referralId: +req.body.referralId,
    sendFormat: req.body.sendFormat,
    dateApproved: req.body.dateApproved[0],
    physician_name: req.body.physician_name === 'undefined' ? null : req.body.physician_name,
    physician_npi: req.body.physician_npi === 'undefined' ? null : req.body.physician_npi,
    patient_account_no: req.body.patient_account_no === 'undefined' ? null : req.body.patient_account_no,
    diagnosis_a: req.body.diagnosis_a === 'undefined' ? null : req.body.diagnosis_a,
    diagnosis_b: req.body.diagnosis_b === 'undefined' ? null : req.body.diagnosis_b,
    diagnosis_c: req.body.diagnosis_c === 'undefined' ? null : req.body.diagnosis_c,
    diagnosis_d: req.body.diagnosis_d === 'undefined' ? null : req.body.diagnosis_d,
    diagnosis_e: req.body.diagnosis_e === 'undefined' ? null : req.body.diagnosis_e,
    diagnosis_f: req.body.diagnosis_f === 'undefined' ? null : req.body.diagnosis_f,
    diagnosis_g: req.body.diagnosis_g === 'undefined' ? null : req.body.diagnosis_g,
    diagnosis_h: req.body.diagnosis_h === 'undefined' ? null : req.body.diagnosis_h,
    diagnosis_i: req.body.diagnosis_i === 'undefined' ? null : req.body.diagnosis_i,
    diagnosis_j: req.body.diagnosis_j === 'undefined' ? null : req.body.diagnosis_j,
    diagnosis_k: req.body.diagnosis_k === 'undefined' ? null : req.body.diagnosis_k,
    diagnosis_l: req.body.diagnosis_l === 'undefined' ? null : req.body.diagnosis_l,
    v1500_filename: req.body.v1500_filename === 'undefined' ? null : req.body.v1500_filename,
    d1500_filename: req.body.d1500_filename === 'undefined' ? null : req.body.d1500_filename,
  };

  // Save d1500 object in the database
  D1500.create(d1500)
    .then(data => {
        res.send(data);
        // console.log(data.dataValues);
        // res.send(data);
        // if (req.body.v1500Id) {
        //     V1500.update({hcfaId: data.dataValues.hcfaId}, {
        //         where: { v1500Id: req.body.v1500Id }
        //     })
        //     .then(response => {
        //         res.send(data);
        //     })
        //     .catch(err => {
        //         res.status(500).send({
        //         message:
        //             err.message || "Some error occurred while updating the row."
        //         });
        //     });
        // }
        // else {
        //     res.send(data);
        // }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the d1500."
      });
    });

};

// Create and Save a new d1500 from python upload
// exports.upload = (req, res) => {

//     // get referralId using claimNumber
//     const claimNumber = req.body.claim_number;
//     const rows = req.body.rows;
//     const today = new Date().toISOString();
//     ReferralView.findOne({ where: { claimNumber: claimNumber } })
//         .then(selectedClaim => {

//             // update v1500 field in dptBillingVisits
//             Visit.update({v1500: today}, {
//                 where: 
//                 { 
//                     referralId: selectedClaim.referralId,
//                     dos: rows[0].dos
//                 }
//             })
//                 .then(num => {

//                     const temp = rows.sort((a, b) => {
//                                         if (a.dos === null){
//                                             return 1;
//                                         }
//                                         if (b.dos === null){
//                                             return -1;
//                                         }
//                                         if (a.dos === b.dos){
//                                             return 0;
//                                         }
//                                         return a.dos < b.dos ? -1 : 1;
//                                     });

//                     const dos_array = temp?.map(r => r.dos);
//                     const uniqueDOS = Array.from(new Set(dos_array));
//                     const uniqueDOSReorder = uniqueDOS.map(x => `${x.substring(5,7)}-${x.substring(8,10)}-${x.substring(0,4)}`);
                    
//                     // Create new d1500
//                     const d1500 = {
//                         method: 'python',
//                         referralId: selectedClaim.referralId,
//                         physician_name: req.body.physician_name || null,
//                         physician_npi: req.body.physician_npi || null,
//                         patient_account_no: req.body.patient_account_no || null,
//                         diagnosis_a: req.body.diagnosis_a || null,
//                         diagnosis_b: req.body.diagnosis_b || null,
//                         diagnosis_c: req.body.diagnosis_c || null,
//                         diagnosis_d: req.body.diagnosis_d || null,
//                         diagnosis_e: req.body.diagnosis_e || null,
//                         diagnosis_f: req.body.diagnosis_f || null,
//                         diagnosis_g: req.body.diagnosis_g || null,
//                         diagnosis_h: req.body.diagnosis_h || null,
//                         diagnosis_i: req.body.diagnosis_i || null,
//                         diagnosis_j: req.body.diagnosis_j || null,
//                         diagnosis_k: req.body.diagnosis_k || null,
//                         diagnosis_l: req.body.diagnosis_l || null,
//                         d1500_filename: `${selectedClaim.claimant} ADJ DOS ${uniqueDOS[0]}${uniqueDOS.length > 1 ? `, ${uniqueDOS[1]}` : ''}${uniqueDOS.length > 2 ? `, ${uniqueDOS[2]}` : ''}${uniqueDOS.length > 3 ? `, ${uniqueDOS[3]}` : ''}${uniqueDOS.length > 4 ? `, ${uniqueDOS[4]}` : ''}${uniqueDOS.length > 5 ? `, ${uniqueDOS[5]}` : ''}.pdf`,
//                         original_dos: `${uniqueDOS[0]}${uniqueDOS.length > 1 ? `, ${uniqueDOS[1]}` : ''}${uniqueDOS.length > 2 ? `, ${uniqueDOS[2]}` : ''}${uniqueDOS.length > 3 ? `, ${uniqueDOS[3]}` : ''}${uniqueDOS.length > 4 ? `, ${uniqueDOS[4]}` : ''}${uniqueDOS.length > 5 ? `, ${uniqueDOS[5]}` : ''}`
//                     };

//                     console.log(d1500.d1500_filename);

//                     // Save d1500 in the database
//                     D1500.create(d1500)
//                         .then(d1500 => {
//                             // save cpt rows in database
//                             Promise.all(
//                                 rows.map((row => {
//                                     const values = {hcfaId: d1500.hcfaId, ...row};
//                                     return D1500Rows.create(values)
//                                 }))
//                             ).then(value => {
//                                 res.send({message: "d1500 successfully uploaded."})
//                             })
//                             .catch(err => {
//                                 res.status(500).send({
//                                     message: "Some error occurred while creating the rows: " + err
//                                 });
//                             });

//                             // retrieve fee schedule for state from DB
//                             // const state = selectedClaim.jurisdiction;

//                             // Lookup_cpt.findAll({
//                             //     attributes: [
//                             //         'Code',
//                             //         `${state}`,
//                             //     ],
//                             //     order: [['code', 'ASC']]
//                             // })
//                             // .then(res_codes => {
//                             //     const {data: codes} = res_codes;
//                             //     // insert cpt rows
//                             //     rows.forEach((row => {
//                             //         // calculate charges
//                             //         const cpt  = +row.cpt;
//                             //         const rate = codes.filter(c => c.Code === cpt)[0][state];
//                             //         const units = +row.units;
//                             //         const charges = (rate * units).toFixed(2);
//                             //         // append charges and hcfaId to payload object
//                             //         const values = {...row, charges: charges, hcfaId: bill.hcfaId};
//                             //         // const values = {hcfaId: bill.hcfaId, ...row};
//                             //         // insert row data into DB
//                             //         D1500Rows.create(values)
//                             //         .then(res_row => {
//                             //             res.send(res_row);
//                             //         })
//                             //         .catch(err => {
//                             //             res.status(500).send({
//                             //                 message:
//                             //                 err.message || "Some error occurred while creating the row."
//                             //             });
//                             //         });

//                             //     }));
//                             //     // res.send(data);
//                             // })
//                             // .catch(err => {
//                             //     res.status(500).send({
//                             //         message:
//                             //         err.message || "Some error occurred while retrieving codes for state."
//                             //     });
//                             // });

//                             // res.send(res_d1500);
//                         })
//                         .catch(err => {
//                             res.status(500).send({
//                                 message: "Some error occurred while creating the d1500: " + err
//                             });
//                         });

            
//                 })
//                 .catch(err => {
//                 res.status(500).send({
//                     message: "Error updating visit:" + err
//                 });
//                 });

//             // res.send(selectedClaim);
            
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error retrieving referral with claim# " + claimNumber + ". Error: " + err
//             });
//         });
// };

// Retrieve all d1500s from the database.

exports.findAll = (req, res) => {

    D1500.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving d1500s."
        });
        });
  
};

// Update an d1500 by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    D1500.update(req.body, {
        where: { hcfaId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "d1500 was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update d1500 with id=${id}. Maybe d1500 was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating d1500 with id=" + id
        });
        });
};

// Delete a d1500 with the specified id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

    D1500.destroy({
        where: { hcfaId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "d1500 was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete d1500 with id=${id}. Maybe d1500 was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error deleting d1500 with id=" + id
        });
        });
};