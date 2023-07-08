const db = require("../models");
const State = db.lookup_UsState;
const Op = db.Sequelize.Op;


// Retrieve all US states from the database.
exports.findAll = (req, res) => {

    State.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving US states."
        });
        });
  
};

// Find a single US state with an id/abbrev
exports.findOne = (req, res) => {
    const id = req.params.id;
    State.findByPk(id)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find US state with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving US state with id=" + id
        });
        });
  
};

// Update a US state by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    State.update(req.body, {
        where: { attorneyId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "US state was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update US state with id=${id}. Maybe US state was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating US state with id=" + id
        });
        });
};

// Find all states with xxxxxx property