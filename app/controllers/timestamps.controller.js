const db = require("../models");
const Timestamp = db.timestamps;
const Op = db.Sequelize.Op;

// Find rrLastWorked
exports.findRRLastWorked = (req, res) => {
  Timestamp.findByPk(1, {
        attributes: [
            'rrLastWorked',
        ],})
        .then(data => {
        if (data) {
            res.send(data.rrLastWorked);
        } else {
            res.status(404).send({
            message: `Cannot find rrLastWorked.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving rrLastWorked"
        });
        });
  
};

// Find ascending
exports.findAscending = (req, res) => {
  Timestamp.findByPk(1)
            .then(data => {
            if (data) {
                res.send(data.ascending);
            } else {
                res.status(404).send({
                message: `Cannot find ascending.`
                });
            }
            })
            .catch(err => {
            res.status(500).send({
                message: "Error retrieving ascending"
            });
            });
  
};

// Update rrLastWorked
exports.updateRRLastWorked = (req, res) => {
    Timestamp.update(req.body, {
        where: { id: 1 }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "rrLastWorked was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update rrLastWorked. Maybe rrLastWorked was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating rrLastWorked"
        });
        });
};