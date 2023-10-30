const db = require("../models");
const V1500View = db.v1500View;
const Op = db.Sequelize.Op;


// Retrieve all v1500View from the database.
exports.findAll = (req, res) => {

    V1500View.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving v1500View."
        });
        });
  
};

// Find all v1500 for a particular claim
exports.findAllV1500ForClaim = (req, res) => {
    V1500View.findAll({ 
      where: { 
        referralId: req.params.id,
        // d1500Approved: {
        //   [Op.ne]: null
        // }
      } 
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving v1500's for claim."
      });
    });
};

// Find all v1500 not approved
exports.findAllV1500NotApproved = (req, res) => {
    V1500View.findAll({ where: { hcfaId: null } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving v1500 notApproved"
      });
    });
};