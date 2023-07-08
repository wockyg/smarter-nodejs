const db = require("../models");
const Claimant = db.claimants;
const Op = db.Sequelize.Op;


// Create and Save a new claimant
exports.create = (req, res) => {
     // Validate request
  // if (!req.body.lastName) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create new claimant
  const claimant = {
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    employerId: req.body.employerId,
    birthDate: req.body.birthDate,
    injuryDate: req.body.injuryDate,
    injuryDate2: req.body.injuryDate2,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    phone: req.body.phone,
    alternatePhone: req.body.alternatePhone,
    email: req.body.email,
    email2: req.body.email2,
    notes: req.body.notes
  };

  // Save claimant in the database
  Claimant.create(claimant)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the claimant."
      });
    });

  
};

// Retrieve all claimants from the database.
exports.findAll = (req, res) => {
    // const lastName = req.query.lastName;
    // var condition = lastName ? { lastName: { [Op.like]: `%${lastName}%` } } : null;

    Claimant.findAll()
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
    Claimant.findByPk(id)
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

// Update an claimant by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Claimant.update(req.body, {
        where: { claimantId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "claimant was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update claimant with id=${id}. Maybe claimant was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating claimant with id=" + id
        });
        });
};

// Delete an claimant with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Claimant.destroy({
        where: { claimantId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "claimant was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete claimant with id=${id}. Maybe claimant was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error deleting claimant with id=" + id
        });
        });
};

// Delete all claimants from the database.
exports.deleteAll = (req, res) => {
    Claimant.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} claimants were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all claimants."
      });
    });  
};