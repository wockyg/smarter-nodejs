const db = require("../models");
const Lookup_cpt = db.lookup_cpt;
const Op = db.Sequelize.Op;

// Create and Save a new CPT Code
exports.create = (req, res) => {

  // Create new CPT Code
  const cpt = {
    Code: req.body.Code,
    MaxUnit: req.body.MaxUnit,
    [req.body.State]: req.body.Rate,
  };

  // Save CPT Code in the database
  Lookup_cpt.create(cpt)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the cpt code."
      });
    });

};

// Update an existing CPT Code
exports.updateCode = (req, res) => {
    const code = req.params.code;

    Lookup_cpt.update(req.body, {
        where: { Code: code }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "cpt was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update cpt${code}. Maybe cpt was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating cpt" + code
        });
        });
};

// Find a single CPT Code
exports.findOne = (req, res) => {
    const code = req.params.code;
    Lookup_cpt.findByPk(code)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find CPT Code ${code}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: `Error retrieving CPT Code ${code}`
        });
        });
  
};

// Find all CPT Codes for a particular state
exports.findAllCodesForState = (req, res) => {
    const state = req.params.state;
    Lookup_cpt.findAll({
      attributes: [
          'Code',
          `${state}`,
          'MaxUnit',
      ],
      order: [['code', 'ASC']]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving codes for state."
      });
    });
};

// Find all cpt dropdown for BillMachine
exports.findAllDropdownBillMachine = (req, res) => {
    Lookup_cpt.findAll({
      attributes: [
          'Code',
          'MaxUnit',
      ],
      order: [['code', 'ASC']]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cptDropdown."
      });
    });
};

// Find all CPT Codes for a particular state
exports.findAllCodes = (req, res) => {
    Lookup_cpt.findAll({
      order: [['code', 'ASC']]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving codes for state."
      });
    });
};