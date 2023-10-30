const db = require("../models");
const D1500View = db.d1500View;
const Op = db.Sequelize.Op;


// Retrieve all d1500View from the database.
exports.findAll = (req, res) => {

    D1500View.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving d1500View."
        });
        });
  
};

// Find all d1500 for a particular claim
exports.findAllD1500ForClaim = (req, res) => {
    D1500View.findAll({ 
      where: { 
        referralId: req.params.id,
        dateApproved: {
          [Op.ne]: null
        }
      } 
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving d1500's for claim."
      });
    });
};

// Find all d1500 not approved
exports.findAllD1500NotApproved = (req, res) => {
    D1500View.findAll({ where: { dateApproved: null, method: 'python' } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving d1500 notApproved"
      });
    });
};