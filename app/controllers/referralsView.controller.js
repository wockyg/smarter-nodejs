const db = require("../models");
const ReferralView = db.referralsView;
const Op = db.Sequelize.Op;


// Retrieve all referral from the database.
exports.findAll = (req, res) => {

    ReferralView.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving referrals."
        });
        });
  
};

// Find a single referral with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    ReferralView.findByPk(id)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find referral with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving referral with id=" + id
        });
        });
  
};

// Find all open referrals
exports.findAllOpen = (req, res) => {
    ReferralView.findAll({ where: { referralStatus: 'Open' } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving open referrals."
      });
    });
};