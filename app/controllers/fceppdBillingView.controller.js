const db = require("../models");
const FceView = db.fceppdBillingView;
const Op = db.Sequelize.Op;


// Find FCE/PPD with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    FceView.findOne({ where: { referralId: id } })
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find FCE with referralId=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving FCE with referralId=" + id
        });
        });
  
};

// Find all adjusterPastDue
exports.findAllAdjusterPastDue = (req, res) => {
    const d = new Date();
    d.setDate(d.getDate() - 45);
    FceView.findAll({
      where: {
        adjusterDatePaid: null,
        d1500Sent: {
          [Op.not]: null,
          [Op.lt]: d
        }
      } 
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving adjusterPastDue."
      });
    });
};

// Find all facilityPastDue
exports.findAllFacilityPastDue = (req, res) => {
    const d = new Date();
    d.setDate(d.getDate() - 45);
    FceView.findAll({
      where: {
        facilityDatePaid: null,
        dos: {
          [Op.not]: null,
          [Op.lt]: d
        }
      } 
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving facilityPastDue."
      });
    });
};