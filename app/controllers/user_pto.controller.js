const db = require("../models");
const UserPto = db.user_pto;
const Op = db.Sequelize.Op;

const emailjs = require('@emailjs/nodejs');


// Create and Save a new pto
exports.create = (req, res) => {

  // console.log(req.body);

  // Create new user
  const pto = {
    userId: +req.body.userId,
    title: req.body.title,
    start: req.body.start,
  };

  if (req.body.dateApproved !== 'undefined') {
    pto.dateApproved = req.body.dateApproved;
  }

  if (req.body.end !== 'undefined') {
    pto.end = req.body.end;
  }

  // Save pto in the database
  UserPto.create(pto)
    .then(data => {
      const params = {
        to_email: "wmcclure@definedpt.com",
        // cc_email: "wmcclure@definedpt.com",
        subject: "PTO Request Submission",
        message: "Request Submitted Successfully"
      };

      emailjs.send('service_zl67u0w', 'template_a7ve3kt', params, {publicKey: '0mive5-lH56wNnNf7', privateKey: 'T8DWBUrOBVTit5NO7UhTo'})
              .then((res) => {
                console.log(res.status, res.text);
                console.log(params);
              }, (err) => {
                console.log(err.text);
      });
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the pto."
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

// Update a pto by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    UserPto.update(req.body, {
        where: { ptoId: id }
    })
        .then(num => {
        if (num == 1) {
            if (req.params.dateApproved) {
              const params = {
                to_email: "wmcclure@definedpt.com",
                // cc_email: "wmcclure@definedpt.com",
                subject: "PTO Request Approved",
                message: "Request Approved"
              };

              emailjs.send('service_zl67u0w', 'template_a7ve3kt', params, {publicKey: '0mive5-lH56wNnNf7', privateKey: 'T8DWBUrOBVTit5NO7UhTo'})
                      .then((res) => {
                        console.log(res.status, res.text);
                        console.log(params);
                      }, (err) => {
                        console.log(err.text);
              });
            }
            res.send({
            message: "pto was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update pto with id=${id}. Maybe pto was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating pto with id=" + id
        });
        });
};

// Delete a pto with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    UserPto.destroy({
        where: { ptoId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "pto was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete pto with id=${id}. Maybe pto was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error deleting pto with id=" + id
        });
        });
};