const db = require("../models");
const Physician = db.physicians;
const Op = db.Sequelize.Op;


// Create and Save a new physician
exports.create = (req, res) => {
     // Validate request
  // if (!req.body.lastName) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create new physician
  const physician = {
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    titles: req.body.titles,
    facility: req.body.facility,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    phone: req.body.phone,
    phoneExt: req.body.phoneExt,
    fax: req.body.fax,
    email: req.body.email,
    email2: req.body.email2,
    notes: req.body.notes,
    npi: req.body.npi
  };

  // Save physician in the database
  Physician.create(physician)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the physician."
      });
    });

  
};

// Retrieve all physicians from the database.
exports.findAll = (req, res) => {
    // const lastName = req.query.lastName;
    // var condition = lastName ? { lastName: { [Op.like]: `%${lastName}%` } } : null;

    Physician.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving physicians."
        });
        });
  
};

// Find a single physician with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Physician.findByPk(id)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find physician with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving physician with id=" + id
        });
        });
  
};

// Update an physician by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Physician.update(req.body, {
        where: { physicianId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "physician was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update physician with id=${id}. Maybe physician was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating physician with id=" + id
        });
        });
};

// Delete an physician with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Physician.destroy({
        where: { physicianId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "physician was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete physician with id=${id}. Maybe physician was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error deleting physician with id=" + id
        });
        });
};

// Delete all physicians from the database.
exports.deleteAll = (req, res) => {
    Physician.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} physicians were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all physicians."
      });
    });  
};