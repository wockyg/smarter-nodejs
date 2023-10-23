const db = require("../models");
const FeatureRequest = db.featureRequests;
const Op = db.Sequelize.Op;

const fs = require('fs-extra')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const { uploadFile } = require('../../s3')

// Create and Save a new featureRequest
exports.create = async (req, res) => {

  // upload screenshot to AWS
   const result = req.file && await uploadFile(req.file);
  //  console.log(result);
   result && await unlinkFile(req.file.path);

  // Create new featureRequest object
  const featureRequest = {
    title: req.body.title,
    description: req.body.description,
    screenshot: req.file?.filename,
    submittedBy: req.body.submittedBy, 
  };

  // Save featureRequest in the database
  FeatureRequest.create(featureRequest)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating featureRequest."
      });
    });

  
};

// Retrieve all featureRequests from the database.
exports.findAll = (req, res) => {
   
    FeatureRequest.findAll()
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

// Find all featureRequests for a given user
exports.findAllUser = (req, res) => {
    FeatureRequest.findAll({ where: { submittedBy: req.params.initials } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving featureRequests for user."
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

// Update a featureRequest by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    FeatureRequest.update(req.body, {
        where: { featureId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "featureRequest was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update featureRequest with id=${id}. Maybe featureRequest was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating featureRequest with id=" + id
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