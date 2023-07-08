const db = require("../models");
const Visit = db.dptBillingVisits;
const Op = db.Sequelize.Op;


// Create and Save a new visit
exports.create = (req, res) => {

  // Create new visit
  const visit = {
    referralId: req.body.referralId,
    dos: req.body.dos,
    dosTime: req.body.time,
    attend: req.body.attend
  };

  // Save visit in the database
  Visit.create(visit)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the visit."
      });
    });

  
};

// Find a single visit with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Visit.findByPk(id)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find visit with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving visit with id=" + id
        });
        });
  
};

// Update a visit by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Visit.update(req.body, {
        where: { billingId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "visit was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update visit with id=${id}. Maybe visit was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating visit with id=" + id
        });
        });
};

// Delete a visit with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Visit.destroy({
        where: { billingId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "visit was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete visit with id=${id}. Maybe visit was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error deleting visit with id=" + id
        });
        });
};

// Find all visits for a particular claim
exports.findAllVisitsForClaim = (req, res) => {
    Visit.findAll({ where: { referralId: req.params.id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving visits for claim."
      });
    });
};