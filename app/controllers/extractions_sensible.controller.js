const db = require("../models");
const Extraction = db.extractions_sensible;
const Op = db.Sequelize.Op;


// Log a new extraction
exports.create = (req, res) => {
  
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "Id can not be empty!"
    });
    return;
  }

  // Create new extraction payload obj
  const extraction = {
    extractionId: req.body.id,
    status: 'WAITING',
  };

  // Log extraction in the database
  Extraction.create(extraction)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while logging the extraction."
      });
    });

  
};

// Retrieve all extraction logs from the database.
exports.findAll = (req, res) => {
    // const lastName = req.query.lastName;
    // var condition = lastName ? { lastName: { [Op.like]: `%${lastName}%` } } : null;

    Extraction.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving extractions."
        });
        });
  
};

// Find a single extraction with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Extraction.findByPk(id)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find extraction with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving extraction with id=" + id
        });
        });
  
};

// Update a extraction by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Extraction.update(req.body, {
        where: { extractionId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Extraction was updated successfully."
            });
        } else {
            res.send({
            message: `${num} rows affected.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating extraction with id=" + id
        });
        });
};

// Delete an bulkBilling with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Extraction.destroy({
        where: { extractionId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Extraction was deleted successfully!"
            });
        } else {
            res.send({
            message: `${num} rows affected.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error deleting extraction with id=" + id
        });
        });
};