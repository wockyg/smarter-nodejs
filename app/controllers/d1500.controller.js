const db = require("../models");
const D1500 = db.d1500;
const ReferralView = db.referralsView;
const Lookup_cpt = db.lookup_cpt;
const D1500Rows = db.d1500Rows;
const Op = db.Sequelize.Op;


// Create and Save a new d1500
exports.create = (req, res) => {

  // Create new d1500
  const d1500 = {
    referralId: req.body.referralId,
    sendFormat: req.body.sendFormat,
  };

  // Save d1500 in the database
  D1500.create(d1500)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the d1500."
      });
    });

};

// Create and Save a new d1500 from python upload
exports.upload = (req, res) => {

    // get referralId using claimNumber
    const claimNumber = req.body.claim_number;
    const rows = req.body.rows;
    ReferralView.findOne({ where: { claimNumber: claimNumber } })
        .then(res_referral => {
            const {data: selectedClaim} = res_referral;
            if (selectedClaim) {
                // Create new d1500
                const d1500 = {
                    method: 'python',
                    referralId: selectedClaim.referralId,
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
                };

                // Save d1500 in the database
                D1500.create(d1500)
                    .then(res_d1500 => {

                        const {data: bill} = res_d1500;

                        rows.forEach((row => {
                            const values = {hcfaId: bill.hcfaId, ...row};
                            // insert row data into DB
                            D1500Rows.create(values)
                            .then(res_row => {
                                // update v1500 field in dptBillingVisits
                                res.send(res_row);
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message:
                                    err.message || "Some error occurred while creating the row."
                                });
                            });

                        }));

                        // retrieve fee schedule for state from DB
                        // const state = selectedClaim.jurisdiction;

                        // Lookup_cpt.findAll({
                        //     attributes: [
                        //         'Code',
                        //         `${state}`,
                        //     ],
                        //     order: [['code', 'ASC']]
                        // })
                        // .then(res_codes => {
                        //     const {data: codes} = res_codes;
                        //     // insert cpt rows
                        //     rows.forEach((row => {
                        //         // calculate charges
                        //         const cpt  = +row.cpt;
                        //         const rate = codes.filter(c => c.Code === cpt)[0][state];
                        //         const units = +row.units;
                        //         const charges = (rate * units).toFixed(2);
                        //         // append charges and hcfaId to payload object
                        //         const values = {...row, charges: charges, hcfaId: bill.hcfaId};
                        //         // const values = {hcfaId: bill.hcfaId, ...row};
                        //         // insert row data into DB
                        //         D1500Rows.create(values)
                        //         .then(res_row => {
                        //             res.send(res_row);
                        //         })
                        //         .catch(err => {
                        //             res.status(500).send({
                        //                 message:
                        //                 err.message || "Some error occurred while creating the row."
                        //             });
                        //         });

                        //     }));
                        //     // res.send(data);
                        // })
                        // .catch(err => {
                        //     res.status(500).send({
                        //         message:
                        //         err.message || "Some error occurred while retrieving codes for state."
                        //     });
                        // });

                        // res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                            err.message || "Some error occurred while creating the d1500."
                        });
                    });

            } else {
                res.status(404).send({
                    message: `Cannot find referral with claim# ${claimNumber}.`
                });
            }
            })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving referral with claim# " + claimNumber
            });
        });
};

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