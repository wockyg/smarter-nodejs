const db = require("../models");
const Employer = db.employers;
const Op = db.Sequelize.Op;


// Create and Save a new employer
exports.create = (req, res) => {
     // Validate request
  // if (!req.body.lastName) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create new employer
  const employer = {
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    contact: req.body.contact,
    phone: req.body.phone,
    phoneExt: req.body.phoneExt,
    phone2: req.body.phone2,
    phone2Ext: req.body.phone2Ext,
    fax: req.body.fax,
    email: req.body.email,
    notes: req.body.notes
  };

  // Save employer in the database
  Employer.create(employer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the employer."
      });
    });

  
};

// Retrieve all employers from the database.
exports.findAll = (req, res) => {
    // const lastName = req.query.lastName;
    // var condition = lastName ? { lastName: { [Op.like]: `%${lastName}%` } } : null;

    Employer.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving employers."
        });
        });
  
};

// Retrieve all employers (minified for dropdown/autocomplete field list).
exports.findAllDropDown = (req, res) => {
    Employer.findAll({
        attributes: [
            'employerId', 
            'name',
        ]
    })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving employers dropdown."
        });
        });
  
};

// Retrieve all employers (minified for search table).
exports.findAllSearchAll = (req, res) => {
    Employer.findAll({
        attributes: [
            'employerId', 
            'name',
            'phone'
        ]
    })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving employers searchall."
        });
        });
  
};

// Find a single employer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Employer.findByPk(id)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find employer with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving employer with id=" + id
        });
        });
  
};

// Update an employer by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Employer.update(req.body, {
        where: { employerId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "employer was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update employer with id=${id}. Maybe employer was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating employer with id=" + id
        });
        });
};

// Delete an employer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Employer.destroy({
        where: { employerId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "employer was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete employer with id=${id}. Maybe employer was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error deleting employer with id=" + id
        });
        });
};

// Delete all employers from the database.
exports.deleteAll = (req, res) => {
    Employer.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} employers were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all employers."
      });
    });  
};