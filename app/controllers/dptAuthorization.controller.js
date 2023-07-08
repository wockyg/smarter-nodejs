const db = require("../models");
const Auth = db.dptAuthorization;
const Op = db.Sequelize.Op;


// Create and Save a new auth
exports.create = (req, res) => {

  // Create new auth
  const auth = {
    referralId: req.body.referralId,
    approvedVisits: req.body.approvedVisits
  };

  // Save auth in the database
  Auth.create(auth)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the auth."
      });
    });

  
};

// Update an auth by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Auth.update(req.body, {
        where: { billingId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "auth was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update auth with id=${id}. Maybe auth was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating auth with id=" + id
        });
        });
};

// Delete an auth with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Auth.destroy({
        where: { billingId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "auth was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete auth with id=${id}. Maybe auth was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error deleting auth with id=" + id
        });
        });
};

// Find all auths for a particular claim
exports.findAllAuthForClaim = (req, res) => {
    Auth.findAll({ where: { referralId: req.params.id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving auths for claim."
      });
    });
};