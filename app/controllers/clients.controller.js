const db = require("../models");
const Client = db.clients;
const Op = db.Sequelize.Op;


// Create and Save a new client
exports.create = (req, res) => {
     // Validate request
  // if (!req.body.lastName) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create new client
  const client = {
    client: req.body.client,
    billReview: req.body.billReview,
    phone: req.body.phone,
    fax: req.body.fax,
    email: req.body.email,
    billingProtocol: req.body.billingProtocol,
    notes: req.body.notes,
    mailingAddress: req.body.mailingAddress
  };

  // Save client in the database
  Client.create(client)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the client."
      });
    });

  
};

// Retrieve all clients from the database.
exports.findAll = (req, res) => {
    // const lastName = req.query.lastName;
    // var condition = lastName ? { lastName: { [Op.like]: `%${lastName}%` } } : null;

    Client.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving clients."
        });
        });
  
};

// Find a single client with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  Client.findByPk(id)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find client with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving client with id=" + id
        });
        });
  
};

// Update an client by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Client.update(req.body, {
        where: { clientId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "client was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update client with id=${id}. Maybe client was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating client with id=" + id
        });
        });
};

// Delete an client with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Client.destroy({
        where: { clientId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "client was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete client with id=${id}. Maybe client was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error deleting client with id=" + id
        });
        });
};

// Delete all clients from the database.
exports.deleteAll = (req, res) => {
    Client.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} clients were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all clients."
      });
    });  
};