const db = require("../models");
const BulkBilling = db.bulkBilling;
const Op = db.Sequelize.Op;


// Create and Save a new bulkBilling
exports.create = (req, res) => {
     // Validate request
  // if (!req.body.lastName) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create new bulkBilling
  const bulkBilling = {
    name: req.body.name,
    billingContact: req.body.billingContact,
    billingPhone: req.body.billingPhone,
    billingPhoneExt: req.body.billingPhoneExt,
    billingFax: req.body.billingFax,
    billingEmail: req.body.billingEmail,
    billingContact2: req.body.billingContact2,
    billingPhone2: req.body.billingPhone2,
    billingPhone2Ext: req.body.billingPhone2Ext,
    billingFax2: req.body.billingFax2,
    billingEmail2: req.body.billingEmail2,
    billsMonthly: req.body.billsMonthly,
    billingNotes: req.body.billingNotes
  };

  // Save bulkBilling in the database
  BulkBilling.create(bulkBilling)
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

// Retrieve all bulkBilling from the database.
exports.findAll = (req, res) => {
    // const lastName = req.query.lastName;
    // var condition = lastName ? { lastName: { [Op.like]: `%${lastName}%` } } : null;

    BulkBilling.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving bulkBilling."
        });
        });
  
};

// Retrieve all bulkBilling (minified for dropdown/autocomplete field list).
exports.findAllDropDown = (req, res) => {
    BulkBilling.findAll({
        attributes: [
            'bulkBillingId', 
            'name',
            'billingContact',
            'billingEmail'
        ]
    })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving bulkBilling dropdown."
        });
        });
  
};

// Retrieve all bulkBilling (minified for search table).
exports.findAllSearchAll = (req, res) => {
    BulkBilling.findAll({
        attributes: [
            'bulkBillingId', 
            'name',
            'billingContact',
            'billingPhone',
            'billingPhoneExt',
            'billingFax',
            'billingEmail'
        ]
    })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving bulkBilling searchall."
        });
        });
  
};

// Find a single bulkBilling with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    BulkBilling.findByPk(id)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find bulkBilling with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving bulkBilling with id=" + id
        });
        });
  
};

// Update a bulkBilling by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    BulkBilling.update(req.body, {
        where: { bulkBillingId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "bulkBilling was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update bulkBilling with id=${id}. Maybe bulkBilling was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating bulkBilling with id=" + id
        });
        });
};

// Delete an bulkBilling with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    BulkBilling.destroy({
        where: { bulkBillingId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "bulkBilling was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete bulkBilling with id=${id}. Maybe employer was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error deleting bulkBilling with id=" + id
        });
        });
};