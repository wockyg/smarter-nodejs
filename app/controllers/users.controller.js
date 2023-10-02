const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;


// Create and Save a new user
exports.create = (req, res) => {

  // Create new user
  const user = {
    initials: req.body.initials,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    status: req.body.status,
    role: req.body.role,
    schPermissions: req.body.schPermissions,
    billPermissions: req.body.billPermissions,
    d1500Permissions: req.body.d1500Permissions,
    rrPermissions: req.body.rrPermissions,
    ptoPermissions: req.body.ptoPermissions
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

// Find a user with a given email address
exports.findOne = (req, res) => {
    User.findOne({ where: { email: req.params.email } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    });
};

// Find a single user with an id
// exports.findOne = (req, res) => {
//     const id = req.params.id;
//     User.findByPk(id)
//         .then(data => {
//         if (data) {
//             res.send(data);
//         } else {
//             res.status(404).send({
//             message: `Cannot find user with id=${id}.`
//             });
//         }
//         })
//         .catch(err => {
//         res.status(500).send({
//             message: "Error retrieving user with id=" + id
//         });
//         });
  
// };

// Update a user by the id in the request
exports.update = (req, res) => {
    const initials = req.params.initials;

    User.update(req.body, {
        where: { initials: initials }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "user was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update user with id=${initials}. Maybe user was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating user with id=" + initials
        });
        });
};

// Delete an client with the specified id in the request
// exports.delete = (req, res) => {
//     const id = req.params.id;

//     User.destroy({
//         where: { initials: id }
//     })
//         .then(num => {
//         if (num == 1) {
//             res.send({
//             message: "user was deleted successfully!"
//             });
//         } else {
//             res.send({
//             message: `Cannot delete user with id=${id}. Maybe user was not found!`
//             });
//         }
//         })
//         .catch(err => {
//         res.status(500).send({
//             message: "Error deleting user with id=" + id
//         });
//         });
// };