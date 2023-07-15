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

// Find all Open/Hold/Reschedule referrals
exports.findAllOpenHoldReschedule = (req, res) => {
    ReferralView.findAll({
        where: { 
            [Op.or]: [
                {referralStatus: 'Open'},
                {referralStatus: 'Hold'},
                {referralStatus: 'Reschedule'}
            ]  
        } })
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

// Find all Complete/pending IA referrals
exports.findAllComplete = (req, res) => {
    ReferralView.findAll({
        where: { referralStatus: 'Complete', ptStatus: null } })
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

// Find all FCE/PPD tomorrow
exports.findAllFcePpdTomorrow = (req, res) => {

    const twoDaysFromToday = new Date();
    const twoDays = twoDaysFromToday.getDate() + 2;
    twoDaysFromToday.setDate(twoDays);
    twoDaysFromToday.setHours(0,0,0,0);

    const tomorrow = new Date();
    const oneDay = tomorrow.getDate() + 1;
    tomorrow.setDate(oneDay);
    tomorrow.setHours(0,0,0,0);

    ReferralView.findAll({
        where: { 
            [Op.and]: [
                {
                    service: {
                        [Op.notLike]: '%DPT%'
                    }
                },
                {
                    apptDate: {
                        [Op.lt]: twoDaysFromToday.toISOString(),
                        [Op.gte]: tomorrow.toISOString()
                    }
                }
            ] 
        }})
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

// Find all FCE/PPD/IA today
exports.findAllApptToday = (req, res) => {

    const today = new Date();
    today.setHours(0,0,0,0);

    const tomorrow = new Date();
    const oneDay = tomorrow.getDate() + 1;
    tomorrow.setDate(oneDay);
    tomorrow.setHours(0,0,0,0);

    ReferralView.findAll({
        where: { 
            [Op.and]: [
                {
                    apptDate: {
                        [Op.lt]: tomorrow.toISOString(),
                        [Op.gte]: today.toISOString()
                    }
                }
            ] 
        }})
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

// Find all missing report
exports.findAllMissingReport = (req, res) => {
    ReferralView.findAll({
        where: { confirmAttend: 'Yes', reportReceivedDate: null } })
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

// Find all report limbo
exports.findAllReportLimbo = (req, res) => {
    ReferralView.findAll({
        where: { 
            [Op.and]: [
                {
                    confirmAttend: 'Yes',
                    reportReceivedDate: {
                        [Op.ne]: null
                    },
                    [Op.or]: {
                        reportToAdjuster: null,
                        reportToPhysician: null
                    }
                }
            ] 
        }})
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

// Find all fu/hold
exports.findAllFollowUpHold = (req, res) => {
    ReferralView.findAll({
        where: { 
            [Op.or]: [
                {ptStatus: 'Hold'},
                {ptStatus: 'Follow-Up'}
            ]  
        } })
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

// Find all referral search
exports.findAllReferralSearch = (req, res) => {
    ReferralView.findAll({
        attributes: [
            'referralId',
            'referralDate', 
            'assign', 
            'service', 
            'approvedVisits', 
            'apptDate', 
            'apptTime', 
            'claimant', 
            'claimNumber',
            'claimantBirthDate', 
            'therapist', 
            'adjuster',
            'casemanager',
            'referralStatus',
            'ptStatus',
            'billingStatus',
            'bodyPart'
        ] 
    })
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