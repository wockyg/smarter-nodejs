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

// Retrieve a user's referral history by the initials in the request
exports.getHistory = (req, res) => {

    const { initials } = req.params;

    const history = [];

    User.findOne({ where: { initials: initials } })
        .then(u => {
          if (u.history5 !== null) {
            history.push(u.history5);
          }
          if (u.history4 !== null) {
            history.push(u.history4);
          }
          if (u.history3 !== null) {
            history.push(u.history3);
          }
          if (u.history2 !== null) {
            history.push(u.history2);
          }
          if (u.history1 !== null) {
            history.push(u.history1);
          }
          
          res.send(history);
          
        })
        .catch(err => {
        res.status(500).send({
            message: "Error finding user with initials " + initials
        });
        });
};

// Update a user's referral history by the initials in the request
exports.updateHistory = (req, res) => {

    const { initials } = req.params;

    const { newId } = req.body;

    let newBody = {};

    User.findOne({ where: { initials: initials } })
        .then(u => {
          if (u.history1 === null) {
            newBody.history1 = newId;
          }
          else if (u.history2 === null) {
            newBody.history2 = newId;
          }
          else if (u.history3 === null) {
            newBody.history3 = newId;
          }
          else if (u.history4 === null) {
            newBody.history4 = newId;
          }
          else if (u.history5 === null) {
            newBody.history5 = newId;
          }
          else {
            newBody.history1 = u.history2;
            newBody.history2 = u.history3;
            newBody.history3 = u.history4;
            newBody.history4 = u.history5;
            newBody.history5 = newId;
          }
          User.update(newBody, {
              where: { initials: initials }
          })
              .then(num => {
              if (num == 1) {
                  res.send({
                  message: "user history was updated successfully."
                  });
              } else {
                  res.send({
                  message: `Cannot update user history with initials ${initials}. Maybe user was not found or req.body is empty!`
                  });
              }
              })
              .catch(err => {
              res.status(500).send({
                  message: "Error updating user with initials " + initials
              });
              });
        })
        .catch(err => {
        res.status(500).send({
            message: "Error finding user with initials " + initials
        });
        });
};

// Update a user by the initials in the request
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
            message: `Cannot update user with initials ${initials}. Maybe user was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating user with initials " + initials
        });
        });
};