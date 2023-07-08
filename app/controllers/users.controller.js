const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;


// Create and Save a new user
exports.create = (req, res) => {
     // Validate request
  // if (!req.body.lastName) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create new user
  const user = {
    initials: req.body.initials,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    status: req.body.status,
    role: req.body.role
  };

  // Save user in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });

  
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
    // const lastName = req.query.lastName;
    // var condition = lastName ? { lastName: { [Op.like]: `%${lastName}%` } } : null;

    User.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving users."
        });
        });
  
};

// Find a single user with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  User.findByPk(id)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find user with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving user with id=" + id
        });
        });
  
};

// Update a user by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { initials: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "user was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating user with id=" + id
        });
        });
};

// Delete an client with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { initials: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "user was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete user with id=${id}. Maybe user was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error deleting user with id=" + id
        });
        });
};