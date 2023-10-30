const db = require("../models");
const D1500RowsView = db.d1500RowsView;
const Op = db.Sequelize.Op;


// Retrieve all d1500View from the database.
exports.findAll = (req, res) => {

    D1500RowsView.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving d1500RowsView."
        });
        });
  
};

// Find all d1500 for a particular hcfaId
exports.findAllD1500RowsForHcfa = (req, res) => {
    D1500RowsView.findAll({ where: { hcfaId: req.params.id } })
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

// Find all d1500 for a particular claim
exports.findAllD1500RowsForClaim = (req, res) => {
    D1500RowsView.findAll({ 
      where: { 
        referralId: req.params.id,
      }  
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving d1500 rows for claim."
      });
    });
};

// Find all d1500 not approved
exports.findAllD1500RowsNotApproved = (req, res) => {
    D1500RowsView.findAll({ where: { dateApproved: null } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving d1500 rows notApproved"
      });
    });
};