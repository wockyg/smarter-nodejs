const db = require("../models");
const Attorney = db.attorneys;
const Op = db.Sequelize.Op;


// Create and Save a new attorney
exports.create = (req, res) => {
     // Validate request
  // if (!req.body.lastName) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create new attorney
  const attorney = {
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    firm: req.body.firm,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    phone: req.body.phone,
    fax: req.body.fax,
    email: req.body.email,
    email2: req.body.email2,
    type: req.body.type
  };

  // Save attorney in the database
  Attorney.create(attorney)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the attorney."
      });
    });

  
};

// Retrieve all attorneys from the database.
exports.findAll = (req, res) => {

    // const lastName = req.query.lastName;
    // var condition = lastName ? { lastName: { [Op.like]: `%${lastName}%` } } : null;

    Attorney.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving attorneys."
        });
        });
  
};

// Find a single attorney with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Attorney.findByPk(id)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find attorney with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving attorney with id=" + id
        });
        });
  
};

// Update an attorney by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Attorney.update(req.body, {
        where: { attorneyId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "attorney was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update attorney with id=${id}. Maybe attorney was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating attorney with id=" + id
        });
        });
};

// Delete an attorney with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Attorney.destroy({
        where: { attorneyId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "attorney was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete attorney with id=${id}. Maybe attorney was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error deleting attorney with id=" + id
        });
        });
};

// Delete all attorney from the database.
exports.deleteAll = (req, res) => {
    Attorney.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} attorneys were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all attorneys."
      });
    });  
};

// Find all plaintiff attorneys
exports.findAllPlaintiff = (req, res) => {
    Attorney.findAll({ where: { type: 'Plaintiff' } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving plaintiff attorneys."
      });
    });
};

// Find all defense attorneys
exports.findAllDefense = (req, res) => {
    Attorney.findAll({ where: { type: 'Defense' } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving defense attorneys."
      });
    });
};