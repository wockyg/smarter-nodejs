const db = require("../models");
const Referral_icd10 = db.referral_icd10;
const Op = db.Sequelize.Op;


// Create and Save a new referral_icd10
exports.create = (req, res) => {

  // Create new referral_icd10
  const referral_icd10 = {
    referralId: req.body.referralId,
    icd10: req.body.icd10,
    rank: req.body.rank,
    letter: req.body.letter,
    description: req.body.description
  };

  // Save in the database
  Referral_icd10.create(referral_icd10)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the referral_icd10."
      });
    });

  
};

// Retrieve all referral_icd10 from the database.
exports.findAll = (req, res) => {

    Referral_icd10.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving referral_icd10."
        });
        });
  
};

// Find all referral_icd10 for a specified refferalId
exports.findAllReferral = (req, res) => {
    const id = req.params.id;
    Referral_icd10.findAll({
        where: {referralId: id},
        order: [['dateAdded', 'ASC']]
        })
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find referral_icd10 with referralId=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving referral_icd10 with referralId=" + id
        });
        });
  
};

// Delete a referral_icd10 with the specified code and referralId in the request
exports.delete = (req, res) => {
    // console.log(req);
    const id = req.query.referralId;
    const icd10 = req.query.icd10;
    Referral_icd10.destroy({
        where: { referralId: id, icd10: icd10 }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "referral_icd10 was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete referral_icd10 with referralId=${id} and icd10=${icd10}. Maybe was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: `Error deleting referral_icd10 with referralId=${id} and icd10=${icd10}`
        });
        });
};