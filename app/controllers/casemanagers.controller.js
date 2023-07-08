const db = require("../models");
const CaseManager = db.casemanagers;
const Op = db.Sequelize.Op;


// Create and Save a new casemanager
exports.create = (req, res) => {
     // Validate request
  // if (!req.body.lastName) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create new casemanager
  const casemanager = {
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    clientId: req.body.clientId,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    phone: req.body.phone,
    phoneExt: req.body.phoneExt,
    fax: req.body.fax,
    email: req.body.email,
    fceRate: req.body.fceRate,
    ppdRate: req.body.ppdRate,
    ppdDiscountRate: req.body.ppdDiscountRate,
    status: req.body.status,
    ptInstructions: req.body.ptInstructions,
    fceInstructions: req.body.fceInstructions,
    billingInstructions: req.body.billingInstructions
  };

  // Save casemanager in the database
  CaseManager.create(casemanager)
    .then(data => {
      // console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the casemanager."
      });
    });

  
};

// Retrieve all casemanager from the database.
exports.findAll = (req, res) => {
    // const lastName = req.query.lastName;
    // var condition = lastName ? { lastName: { [Op.like]: `%${lastName}%` } } : null;

    CaseManager.findAll()
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
    CaseManager.findByPk(id)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find casemanager with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving casemanager with id=" + id
        });
        });
  
};

// Update an casemanager by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    CaseManager.update(req.body, {
        where: { casemanagerId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "casemanager was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update casemanager with id=${id}. Maybe casemanager was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating casemanager with id=" + id
        });
        });
};

// Delete an casemanager with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    CaseManager.destroy({
        where: { casemanagerId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "casemanager was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete casemanager with id=${id}. Maybe casemanager was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error deleting casemanager with id=" + id
        });
        });
};

// Delete all casemanagers from the database.
exports.deleteAll = (req, res) => {
    CaseManager.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} casemanagers were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all casemanagers."
      });
    });  
};

// Find all active casemanagers
exports.findAllActive = (req, res) => {
    CaseManager.findAll({ where: { status: 'active' } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving active casemanagers ."
      });
    });
};