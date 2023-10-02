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

// Find all Open/Hold/Reschedule/Cancel referrals
exports.findAllOpenHoldRescheduleCancel = (req, res) => {
    ReferralView.findAll({
        where: { 
            [Op.or]: [
                {referralStatus: 'Open'},
                {referralStatus: 'Hold'},
                {referralStatus: 'Reschedule'},
                {referralStatus: 'Cancel'}
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
exports.findAllSearchAll = (req, res) => {
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
            'employer',
            'therapist',
            'therapistAddress',
            'therapistSuite',
            'therapistCity',
            'therapistState',
            'therapistZip',
            'therapistPhone',
            'therapistFax',
            'therapistBeaver',
            'adjuster',
            'adjusterClient',
            'adjusterBeaver',
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
          err.message || "Some error occurred while retrieving referrals searchall."
      });
    });
};

// Retrieve referrals that match search criteria
exports.searchReferrals = (req, res) => {
    const {
      assign, 
      service, 
      claimant, 
      claimNumber,
      therapist,
      adjuster,
      adjusterClient,
      casemanager,
      referralStatus,
      ptStatus,
      billingStatus,
      bodyPart
     } = req.query;

    // const assign = req.query.assign;

    // console.log(req.query);

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
            'adjusterClient',
            'casemanager',
            'referralStatus',
            'ptStatus',
            'billingStatus',
            'bodyPart'
        ],
        where: { 
            [Op.and]: [
                {assign: {
                  [Op.like]: assign ? `${assign}` : '%'
                }},
                {service: {
                  [Op.like]: service ? `%${service}%` : '%'
                }},
                {claimant: {
                  [Op.like]: claimant ? `%${claimant}%` : '%'
                }},
                {claimNumber: {
                  [Op.like]: claimNumber ? `%${claimNumber}%` : '%'
                }},
                {therapist: therapist 
                          ? 
                          { [Op.like]: `%${therapist}%` } 
                          : 
                          { [Op.or]: {
                            [Op.like]: '%',
                            [Op.is]: null,
                          } }
                },
                {adjuster: adjuster 
                          ? 
                          { [Op.like]: `%${adjuster}%` } 
                          : 
                          { [Op.or]: {
                            [Op.like]: '%',
                            [Op.is]: null,
                          } }
                },
                {adjusterClient: adjusterClient 
                          ? 
                          { [Op.like]: `%${adjusterClient}%` } 
                          : 
                          { [Op.or]: {
                            [Op.like]: '%',
                            [Op.is]: null,
                          } }
                },
                {casemanager: casemanager 
                          ? 
                          { [Op.like]: `%${casemanager}%` } 
                          : 
                          { [Op.or]: {
                            [Op.like]: '%',
                            [Op.is]: null,
                          } }
                },
                {referralStatus: {
                  [Op.like]: referralStatus ? `${referralStatus}` : '%'
                }},
                {ptStatus: ptStatus 
                          ? 
                          { [Op.like]: `${ptStatus}` } 
                          : 
                          { [Op.or]: {
                            [Op.like]: '%',
                            [Op.is]: null,
                          } }
                },
                {billingStatus: billingStatus 
                          ? 
                          { [Op.like]: `${billingStatus}` } 
                          : 
                          { [Op.or]: {
                            [Op.like]: '%',
                            [Op.is]: null,
                          } }
                },
                {bodyPart: bodyPart 
                          ? 
                          { [Op.like]: `${bodyPart}` } 
                          : 
                          { [Op.or]: {
                            [Op.like]: '%',
                            [Op.is]: null,
                          } }
                },
            ]  
        }
    })
    .then(data => {
      console.log(data.length);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving referrals."
      });
    });
};

// Find all referral dropdown
exports.findAllReferralDropdown = (req, res) => {
    ReferralView.findAll({
        attributes: [
            'referralId',
            'assign', 
            'service', 
            'claimant', 
            'claimNumber',
            'claimantBirthDate',
            'referralStatus',
            'ptStatus',
            'billingStatus',
            'bodyPart',
            'apptDate',
            'apptTime'
        ],
        where: {
            billingStatus: {
                [Op.ne]: 'Complete'
            }
        }
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

// Find all referral calendar
exports.findAllReferralCalendar = (req, res) => {
    ReferralView.findAll({
        attributes: [
            'referralId',
            'assign', 
            'service', 
            'claimant', 
            'claimNumber',
            'claimantBirthDate',
            'referralStatus',
            'ptStatus',
            'billingStatus',
            'bodyPart',
            'apptDate',
            'apptTime',
            'referralDate',
            'therapistState'
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

// Find all referrals tasks
exports.findAllReferralsTasks = (req, res) => {
    ReferralView.findAll({
        attributes: [
            'referralId',
            'assign', 
            'service', 
            'ptStatus',
            'billingStatus',
        ],
        where: {
          [Op.and]: {
            ptStatus: 'Active',
            service: {
              [Op.substring]: 'DPT'
            }
          },
        }
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