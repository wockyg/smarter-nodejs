const db = require("../models");
const V1500RowsView = db.v1500RowsView;
const Op = db.Sequelize.Op;


// Retrieve all d1500View from the database.
exports.findAll = (req, res) => {

    V1500RowsView.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving v1500RowsView."
        });
        });
  
};

// Find all v1500 for a particular hcfaId
exports.findAllV1500RowsForHcfa = (req, res) => {
    V1500RowsView.findAll({ where: { hcfaId: req.params.id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving d1500 rows for hcfa."
      });
    });
};

// Find all v1500 for a particular claim
exports.findAllV1500RowsForClaim = (req, res) => {
    V1500RowsView.findAll({ 
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
          err.message || "Some error occurred while retrieving v1500 rows for claim."
      });
    });
};

// Find all v1500 not approved
exports.findAllV1500RowsNotApproved = (req, res) => {
    V1500RowsView.findAll({ where: { hcfaId: null } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving v1500 rows notApproved"
      });
    });
};