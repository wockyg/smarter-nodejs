const db = require("../models");
const AdjusterView = db.adjustersView;
const Op = db.Sequelize.Op;


// Retrieve all adjusters from the database.
exports.findAll = (req, res) => {
    // const lastName = req.query.lastName;
    // var condition = lastName ? { lastName: { [Op.like]: `%${lastName}%` } } : null;

    AdjusterView.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving adjusters."
        });
        });
  
};

// Find a single adjuster with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    AdjusterView.findByPk(id)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find adjuster with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving adjuster with id=" + id
        });
        });
  
};

// Find all active adjusters
exports.findAllActive = (req, res) => {
    AdjusterView.findAll({ where: { status: 'active' } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving active adjusters."
      });
    });
};

// Retrieve all adjusters from the database (minified for dropdown/autocomplete field list).
exports.findAllDropDown = (req, res) => {
    AdjusterView.findAll({
        attributes: [
            'adjusterId', 
            'firstName',
            'lastName',
            'clientId',
            'client'
        ],
        where: {
            status: {
                [Op.or]: {
                    [Op.eq]: 'Active',
                    [Op.is]: null
                }
            }
        }
    })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving adjusters dropdown."
        });
        });
};

// Retrieve all adjusters from the database (minified for search table).
exports.findAllSearchAll = (req, res) => {
    AdjusterView.findAll({
        attributes: [
            'adjusterId', 
            'firstName',
            'lastName',
            'clientId',
            'client',
            'email',
            'status'
        ]
    })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving adjusters searchall."
        });
        });
};