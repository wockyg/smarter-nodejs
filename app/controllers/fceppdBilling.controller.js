const db = require("../models");
const Fce = db.fceppdBilling;
const Op = db.Sequelize.Op;


// Find FCE/PPD with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Fce.findOne({ where: { referralId: id } })
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find fce/ppd with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving fce/ppd with id=" + id
        });
        });
  
};

// Update an FCE/PPD by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Fce.update(req.body, {
        where: { referralId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "pfce/ppd was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update fce/ppd with id=${id}. Maybe fce/ppd was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating fce/ppd with id=" + id
        });
        });
};

// Delete a FCE/PPD with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Fce.destroy({
        where: { referralId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "fce/ppd was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete fce/ppd with id=${id}. Maybe fce/ppd was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error deleting fce/ppd with id=" + id
        });
        });
};