const db = require("../models");
const D1500 = db.d1500;
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