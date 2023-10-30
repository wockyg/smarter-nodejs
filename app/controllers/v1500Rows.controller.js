const db = require("../models");
const V1500Rows = db.v1500Rows;
const Op = db.Sequelize.Op;


// Create and Save a new d1500Row
exports.create = (req, res) => {

  // Create new d1500Row
  const row = {
    hcfaId: req.body.hcfaId,
    dos: req.body.dos,
    pos: req.body.pos,
    cpt: req.body.cpt,
    mod1: req.body.mod1,
    mod2: req.body.mod2,
    mod3: req.body.mod3,
    mod4: req.body.mod4,
    diag: req.body.diag,
    charges: req.body.charges,
    units: req.body.units,
    provider_npi: req.body.provider_npi,
  };

  // Save d1500Row in the database
  V1500Rows.create(row)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the row."
      });
    });

};

// Retrieve all d1500Rows from the database.
exports.findAll = (req, res) => {

    V1500Rows.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving v1500Rows."
        });
        });
  
};

// Find all v1500 for a particular hcfaId
exports.findAllV1500ForHcfa = (req, res) => {
    V1500Rows.findAll({ where: { hcfaId: req.params.id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving v1500's for hcfa."
      });
    });
};

// Update a v1500Row by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    V1500Rows.update(req.body, {
        where: { rowId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "v1500Row was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update v1500Row with id=${id}. Maybe v1500Row was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating v1500Row with id=" + id
        });
        });
};

// Delete a v1500Row with the specified id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

    V1500Rows.destroy({
        where: { rowId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "v1500Row was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete v1500Row with id=${id}. Maybe v1500Row was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error deleting v1500Row with id=" + id
        });
        });
};