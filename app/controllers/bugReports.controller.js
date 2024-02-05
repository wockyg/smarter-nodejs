const db = require("../models");
const BugReport = db.bugReports;
const Op = db.Sequelize.Op;

const fs = require('fs-extra')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const { uploadFile } = require('../../s3')

// Create and Save a new bugReport
exports.create = async (req, res) => {

  // upload screenshot to AWS
  const result = req.file && await uploadFile(req.file);
  //  console.log(result);
  result && await unlinkFile(req.file.path);

  // Create new bugReport object
  const bugReport = {
    title: req.body.title,
    description: req.body.description,
    screenshot: req.file?.filename,
    submittedBy: req.body.submittedBy, 
  };

  // Save bugReport in the database
  BugReport.create(bugReport)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating bugReport."
      });
    });

  
};

// Retrieve all bugReports from the database.
exports.findAll = (req, res) => {
   
    BugReport.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving bugReports."
        });
        });
  
};

// Retrieve all unfixed bugReports from the database.
exports.findAllUnfixed = (req, res) => {
   
    BugReport.findAll({ where: { dateFixed: null } })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving unfixed bugReports."
        });
        });
  
};

// Find all bugReports for a given user
exports.findAllUser = (req, res) => {
    BugReport.findAll({ where: { submittedBy: req.params.initials } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bugReports for user."
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

// Update a bugReport by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    BugReport.update(req.body, {
        where: { bugId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "bugReport was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update bugReport with id=${id}. Maybe bugReport was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating bugReport with id=" + id
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