const db = require("../models");
const Lookup_cpt = db.lookup_cpt;
const Op = db.Sequelize.Op;



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