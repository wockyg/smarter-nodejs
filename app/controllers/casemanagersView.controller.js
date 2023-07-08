const db = require("../models");
const CasemanagerView = db.casemanagersView;
const Op = db.Sequelize.Op;


// Retrieve all casemanagers from the database.
exports.findAll = (req, res) => {
    // const lastName = req.query.lastName;
    // var condition = lastName ? { lastName: { [Op.like]: `%${lastName}%` } } : null;

    CasemanagerView.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving casemanagers."
        });
        });
  
};

// Find a single casemanager with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    CasemanagerView.findByPk(id)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find casemanagers with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving casemanagers with id=" + id
        });
        });
  
};

// Find all active casemanagers
exports.findAllActive = (req, res) => {
    CasemanagerView.findAll({ where: { status: 'active' } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving active casemanagers."
      });
    });
};