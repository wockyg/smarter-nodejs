const db = require("../models");
const Referral = db.referrals;
const Op = db.Sequelize.Op;


// Create and Save a new referral
exports.create = (req, res) => {
     // Validate request
  // if (!req.body.lastName) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create new referral
  const referral = {
    claimantId: req.body.claimantId,
    therapistId: req.body.therapistId,
    adjusterId: req.body.adjusterId,
    casemanagerId: req.body.casemanagerId,
    casemanager2Id: req.body.casemanager2Id,
    physicianId: req.body.physicianId,
    plaintiffAttorneyId: req.body.plaintiffAttorneyId,
    defenseAttorneyId: req.body.defenseAttorneyId,
    referralStatus: req.body.referralStatus,
    assign: req.body.assign,
    spanishSpeaking: req.body.spanishSpeaking,
    translationNeeded: req.body.translationNeeded,
    transportNeeded: req.body.transportNeeded,
    postOp: req.body.postOp,
    service: req.body.service,
    jurisdiction: req.body.jurisdiction,
    bodyPart: req.body.bodyPart,
    icd10: req.body.icd10,
    approvedVisits: req.body.approvedVisits,
    odg: req.body.odg,
    evalAndTreat: req.body.evalAndTreat,
    claimNumber: req.body.claimNumber,
    fuDrDate: req.body.fuDrDate,
    claimantInfoFromAdjuster: req.body.claimantInfoFromAdjuster,
    rxFromAdjuster: req.body.rxFromAdjuster,
    demosFromAdjuster: req.body.demosFromAdjuster,
    ovnFromAdjuster: req.body.ovnFromAdjuster,
    ptNotesFromAdjuster: req.body.ptNotesFromAdjuster,
    jdFromAdjuster: req.body.jdFromAdjuster,
    mriFromAdjuster: req.body.mriFromAdjuster,
    postOpFromAdjuster: req.body.postOpFromAdjuster,
    betaTest: req.body.betaTest || null
    
  };

  // Save referral in the database
  Referral.create(referral)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the referral."
      });
    });

  
};

// Retrieve all referrals from the database.
exports.findAll = (req, res) => {
    // const lastName = req.query.lastName;
    // var condition = lastName ? { lastName: { [Op.like]: `%${lastName}%` } } : null;

    Referral.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving referrals."
        });
        });
  
};

// Find a single referral with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Referral.findByPk(id)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find referral with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving referral with id=" + id
        });
        });
  
};

// Update an referral by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    console.log("params:", req.params); 

    Referral.update(req.body, {
        where: { referralId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "referral was updated successfully."
            });
        } else {
            res.send({
            message: `0 records affected.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating referral with id=" + id + " Error:" + err
        });
        });
};

// Delete an referral with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Referral.destroy({
        where: { referralId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "referral was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete referral with id=${id}. Maybe referral was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error deleting referral with id=" + id
        });
        });
};

// Delete all referrals from the database.
exports.deleteAll = (req, res) => {
    Referral.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} referrals were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all referrals."
      });
    });  
};