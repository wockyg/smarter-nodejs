const db = require("../models");
const Therapist = db.therapists;
const Op = db.Sequelize.Op;


// Create and Save a new therapist
exports.create = (req, res) => {
     // Validate request
  // if (!req.body.lastName) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create new therapist
  const therapist = {
    name: req.body.name,
    address: req.body.address,
    suite: req.body.suite,
    bldg: req.body.bldg,
    unit: req.body.unit,
    floor: req.body.floor,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    bulkBillingId: req.body.bulkBillingId,
    phone: req.body.phone,
    phoneExt: req.body.phoneExt,
    fax: req.body.fax,
    contact: req.body.contact,
    contact2: req.body.contact2,
    email: req.body.email,
    email2: req.body.email2,
    spanish: req.body.spanish,
    fceTier: req.body.fceTier,
    fceAgreement: req.body.fceAgreement,
    fceAgreementStatus: req.body.fceAgreementStatus,
    fceAgreementTimestamp: req.body.fceAgreementTimestamp,
    fce: req.body.fce,
    fceRate: req.body.fceRate,
    ppd: req.body.ppd,
    ppdRate: req.body.ppdRate,
    dptAgreement: req.body.dptAgreement,
    dptAgreementStatus: req.body.dptAgreementStatus,
    dptAgreementTimestamp: req.body.dptAgreementTimestamp,
    dpt: req.body.dpt,
    dailyRate: req.body.dailyRate,
    evalRate: req.body.evalRate,
    combinedRate: req.body.combinedRate,
    wcwhFirst2Hrs: req.body.wcwhFirst2Hrs,
    wcwhAdditionalHour: req.body.wcwhAdditionalHour,
    wcwhAgreement: req.body.wcwhAgreement,
    wcwhAgreementStatus: req.body.wcwhAgreementStatus,
    wcwhAgreementTimestamp: req.body.wcwhAgreementTimestamp,
    billingContact: req.body.billingContact,
    billingPhone: req.body.billingPhone,
    billingPhoneExt: req.body.billingPhoneExt,
    billingFax: req.body.billingFax,
    billingEmail: req.body.billingEmail,
    billingContact2: req.body.billingContact2,
    billingPhone2: req.body.billingPhone2,
    billingPhone2Ext: req.body.billingPhone2Ext,
    billingFax2: req.body.billingFax2,
    billingEmail2: req.body.billingEmail2,
    billsMonthly: req.body.billsMonthly,
    billingProfile: req.body.billingProfile,
    dpt_an: req.body.dpt_an,
    ppd_gl: req.body.ppd_gl,
    dpt_aq: req.body.dpt_aq,
    dpt_mt: req.body.dpt_mt,
    dpt_ot: req.body.dpt_ot,
    dpt_wh: req.body.dpt_wh,
    dpt_wc: req.body.dpt_wc,
    dpt_th: req.body.dpt_th,
    doNotUse: req.body.doNotUse,
    doNotUseReason: req.body.doNotUseReason,
    notes: req.body.notes,
    ptProfile: req.body.ptProfile
    
  };

  // Save therapist in the database
  Therapist.create(therapist)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the therapist."
      });
    });

  
};

// Retrieve all therapists from the database.
exports.findAll = (req, res) => {
    // const lastName = req.query.lastName;
    // var condition = lastName ? { lastName: { [Op.like]: `%${lastName}%` } } : null;

    Therapist.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving therapists."
        });
        });
  
};

// Retrieve all therapists from the database (minified for dropdown/autocomplete field list).
exports.findAllDropDown = (req, res) => {
    Therapist.findAll({
        attributes: [
            'therapistId', 
            'name',
            'address',
            'city',
            'state',
            'zip',
            'phone',
            'phoneExt',
            'fax'
        ],
        where: {
            doNotUse: {
                [Op.is]: null
            }
        }
    })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving therapists dropdown."
        });
        });
  
};

// Retrieve all therapists from the database (minified for search table).
exports.findAllSearchAll = (req, res) => {
    Therapist.findAll({
        attributes: [
            'therapistId', 
            'name',
            'address',
            'city',
            'state',
            'zip',
            'phone',
            'phoneExt',
            'fax',
            'fceAgreement',
            'fceAgreementStatus',
            'fceAgreementTimestamp',
            'fce',
            'fceRate',
            'ppd',
            'ppdRate',
            'dptAgreement',
            'dptAgreementStatus',
            'dptAgreementTimestamp',
            'dpt',
            'dailyRate',
            'evalRate',
            'combinedRate',
            'wcwhFirst2Hrs',
            'wcwhAdditionalHour',
            'wcwhAgreement',
            'wcwhAgreementStatus',
            'wcwhAgreementTimestamp'
        ]
    })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving therapists dropdown."
        });
        });
  
};

// Find a single therapist with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Therapist.findByPk(id)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find therapist with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving therapist with id=" + id
        });
        });
  
};

// Update an therapist by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Therapist.update(req.body, {
        where: { therapistId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "therapist was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update therapist with id=${id}. Maybe therapist was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating therapist with id=" + id
        });
        });
};

// Delete an therapist with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Therapist.destroy({
        where: { therapistId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "therapist was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete therapist with id=${id}. Maybe therapist was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error deleting therapist with id=" + id
        });
        });
};

// Delete all therapists from the database.
exports.deleteAll = (req, res) => {
    Therapist.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} therapists were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all therapists."
      });
    });  
};