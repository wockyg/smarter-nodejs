const db = require("../models");
const ClaimantView = db.claimantsView;
const Op = db.Sequelize.Op;


// Retrieve all claimants from the database.
exports.findAll = (req, res) => {
    // const lastName = req.query.lastName;
    // var condition = lastName ? { lastName: { [Op.like]: `%${lastName}%` } } : null;

    ClaimantView.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving claimants."
        });
        });
  
};

// Find a single claimant with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    ClaimantView.findByPk(id)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find claimant with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving claimant with id=" + id
        });
        });
  
};