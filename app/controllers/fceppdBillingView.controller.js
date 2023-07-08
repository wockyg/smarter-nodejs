const db = require("../models");
const FceView = db.fceppdBillingView;
const Op = db.Sequelize.Op;


// Find FCE/PPD with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    FceView.findOne({ where: { referralId: id } })
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find FCE with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving FCE with id=" + id
        });
        });
  
};