const db = require("../models");
const UserPto = db.user_pto;
const Op = db.Sequelize.Op;


// Create and Save a new pto
exports.create = (req, res) => {

  // Create new user
  const pto = {
    userId: req.body.userId,
    title: req.body.title,
    start: req.body.start,
    end: req.body.end
  };

  // Save pto in the database
  UserPto.create(pto)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the pto."
      });
    });

  
};

// Retrieve all pto from the database.
exports.findAll = (req, res) => {
   
    UserPto.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving pto."
        });
        });
  
};

// Find all pto for a given user
exports.findAllUser = (req, res) => {
    UserPto.findAll({ where: { userId: req.params.userId } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pto for user."
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
// exports.update = (req, res) => {
//     const initials = req.params.initials;

//     User.update(req.body, {
//         where: { initials: initials }
//     })
//         .then(num => {
//         if (num == 1) {
//             res.send({
//             message: "user was updated successfully."
//             });
//         } else {
//             res.send({
//             message: `Cannot update user with id=${initials}. Maybe user was not found or req.body is empty!`
//             });
//         }
//         })
//         .catch(err => {
//         res.status(500).send({
//             message: "Error updating user with id=" + initials
//         });
//         });
// };

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