const db = require("../models");
const Adjuster = db.adjusters;
const Op = db.Sequelize.Op;


// Create and Save a new adjuster
exports.create = (req, res) => {

  // Create new adjuster
  const adjuster = {
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    clientId: req.body.clientId,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    phone: req.body.phone,
    phoneExt: req.body.phoneExt,
    phone2: req.body.phone2,
    phone2Ext: req.body.phone2Ext,
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

  // Save adjuster in the database
  Adjuster.create(adjuster)
    .then(data => {
      console.log('data:', data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the adjuster."
      });
    });

  
};

// Retrieve all adjusters from the database.
exports.findAll = (req, res) => {
    // const lastName = req.query.lastName;
    // var condition = lastName ? { lastName: { [Op.like]: `%${lastName}%` } } : null;

    Adjuster.findAll()
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
    Adjuster.findByPk(id)
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

// Update an adjuster by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Adjuster.update(req.body, {
        where: { adjusterId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "adjuster was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update adjuster with id=${id}. Maybe adjuster was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating adjuster with id=" + id
        });
        });
};

// Delete an adjuster with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Adjuster.destroy({
        where: { adjusterId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "adjuster was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete adjuster with id=${id}. Maybe adjuster was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error deleting adjuster with id=" + id
        });
        });
};

// Delete all adjusters from the database.
exports.deleteAll = (req, res) => {
    Adjuster.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} adjusters were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all adjusters."
      });
    });  
};

// Find all active adjusters
exports.findAllActive = (req, res) => {
    Adjuster.findAll({ where: { status: 'active' } })
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