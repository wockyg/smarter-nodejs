const db = require("../models");
const ReferralView = db.referralsView;
const ReferralNote = db.referralNotes;
const VisitView = db.dptBillingVisitsView;
const Op = db.Sequelize.Op;
// const sequelize = db.sequelize;

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

    const today = new Date();
    const isFriday = today.getDay() === 5;

    const tomorrow = new Date();
    const oneDay = tomorrow.getDate() + 1;
    tomorrow.setDate(oneDay);
    tomorrow.setHours(0,0,0,0);

    const twoDaysFromToday = new Date();
    const twoDays = twoDaysFromToday.getDate() + 2;
    twoDaysFromToday.setDate(twoDays);
    twoDaysFromToday.setHours(0,0,0,0);

    const threeDaysFromToday = new Date();
    const threeDays = threeDaysFromToday.getDate() + 3;
    threeDaysFromToday.setDate(threeDays);
    threeDaysFromToday.setHours(0,0,0,0);

    const fourDaysFromToday = new Date();
    const fourDays = fourDaysFromToday.getDate() + 4;
    fourDaysFromToday.setDate(fourDays);
    fourDaysFromToday.setHours(0,0,0,0);

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
                        [Op.lt]: isFriday ? fourDaysFromToday.toISOString() : twoDaysFromToday.toISOString(),
                        [Op.gte]: isFriday ? threeDaysFromToday.toISOString() : tomorrow.toISOString()
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

// Find all past appts
exports.findAllPastAppts = (req, res) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    ReferralView.findAll({
      where: { 
        referralStatus: "Complete",
        confirmAttend: null,
        apptDate: {[Op.lt]: today}
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
            'claimantEmployerId',
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
            'adjusterClientId',
            'adjusterBeaver',
            'casemanager',
            'referralStatus',
            'ptStatus',
            'billingStatus',
            'bodyPart',
            'reportToAdjuster'
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

// Patient Records Request report
exports.recordsRequest = (req, res) => {
    ReferralView.findAll({
        attributes: [
            'referralId',
            'assign',
            'service',
            'claimant',
            'claimNumber',
            'claimantBirthDate',
            'therapistPhone',
            'therapistFax',
            'therapistId',
            'therapistBeaver',
            'ptStatus',
            'fuHoldNotes',
            'bodyPart',
            'rrLastLastWorked',
            'rrLastWorked',
            'ccWorked',
            'rrFaxReceived',
            'rrFaxPreference',
            'rrFax',
            'rrEmailPreference',
            'rrEmail',
            'rrPhonePreference',
            'rrPhone',
        ],
        where: { 
            service: {
              [Op.like]: '%DPT%'
            },
            ptStatus: {
              [Op.ne]: 'Discharge',
              [Op.not]: null
            }
        }
    })
    .then(data => {

      // console.log(data);

      // Returns the ISO week of the date.
      Date.prototype.getWeek = function() {
        var date = new Date(this.getTime());
        date.setHours(0, 0, 0, 0);
        // Thursday in current week decides the year.
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        // January 4 is always in week 1.
        var week1 = new Date(date.getFullYear(), 0, 4);
        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                              - 3 + (week1.getDay() + 6) % 7) / 7);
      }

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(-5,0,0,0);

      const mon = new Date();
      mon.setDate(mon.getDate() - 2);
      mon.setHours(0,0,0,0);

      const today = new Date();
      today.setHours(-5,0,0,0);

      const week = today.getWeek();
      const monWeek = mon.getWeek();

      // console.log("WEEK:", week)
      // console.log("mon:", mon)
      // console.log("monWeek:", monWeek)
      // console.log("tom:", tomorrow)
      // console.log("today:", today)

      // res.send(data);

      Promise.all(
        data.map(element => {

          const workedDate = new Date(element.rrLastWorked);
          workedDate.setHours(workedDate.getHours() + 5);

          return VisitView.findAll({
                attributes: [
                  'referralId',
                  'dos',
                  'dosTime',
                  'attend',
                  'needPN',
                  'notesReceived'
                ],
                where: {
                  referralId: element.referralId,
                },
                order: [['dos', 'DESC']]
              })
              .then(appts => {

                const missingAttendance = appts.filter(a => {
                  return a.attend === null && 
                         a.dos !== null && 
                         new Date(a.dos) < tomorrow
                })
                .map(r => {return {dos: r.dos, dosTime: r.dosTime}});

                const numMissingAttendance = missingAttendance.length;
                
                const numFutureAppts = appts.filter(a => new Date(a.dos) > tomorrow).length;
                
                const pn = appts.filter(a => {
                  return new Date(a.dos) < tomorrow && 
                         a.dos !== null && 
                         a.needPN !== null && 
                         a.notesReceived !== 'Progress' && 
                         a.notesReceived !== 'Re-Eval' && 
                         a.notesReceived !== 'Discharge'
                });

                const needPn1 = pn.length > 0 && pn[0]?.notesReceived !== 'Progress' && pn[0]?.notesReceived !== 'Re-Eval' && pn[0]?.notesReceived !== 'Discharge';
              
                const needDc = element.fuHoldNotes === 'Need DC note' && element.ptStatus !== 'Active';

                const lastDOS = appts.filter(a => a.dos !== null)[0].dos;

                
                const numBlankAppts = appts.filter(a => a.attend === null && a.dos !== null).length; 
                const numBlankDOS = appts.filter(a => a.attend === null && a.dos === null).length; 

                const eoa = (numBlankDOS === 0) && ((numBlankAppts === 0) || ((numBlankAppts > 0) && (appts[0].dos !== null && new Date(appts[0].dos) < tomorrow))) && !needDc;
                
                const needPn = needPn1 && !needDc && !eoa;

                const needUca = numFutureAppts === 0 && !needDc && !eoa;
                
                const caughtUp = numMissingAttendance === 0 && !eoa && !needUca && !needPn && !needDc;

                let worked = null;

                let workedPrev = null;

                if (caughtUp) {
                  worked = "Caught Up";
                }
                else if (element.ccWorked !== null) {
                   worked = "*CC";
                }
                else if ((element.ptStatus === "Follow-Up" || element.ptStatus === "Hold") && 
                          element.fuHoldNotes !== "Need DC note" && 
                          element.fuHoldNotes !== "Need Upcoming appts" && 
                          element.fuHoldNotes !== "Pending PN") {

                   worked = "FU/H";
                }
                else if (workedDate.getWeek() === week) {
                  worked = element.rrLastWorked;
                }

                if (element.rrLastWorked !== null) {
                  if (workedDate.getWeek() === week) {
                    workedPrev = element.rrLastLastWorked
                  }
                  else {
                    if (element.referralId === 6464) {
                      console.log("worked:", workedDate);
                      console.log("workedWeek:", workedDate.getWeek());
                      console.log("mon:", mon);
                      console.log("monWeek:", monWeek);
                      console.log("today:", today);
                      console.log("todayWeek:", week);
                    }
                    workedPrev = element.rrLastWorked;
                  }
                }

                const rrFaxReceived = (worked !== null && worked !== 'FU/H' && worked !== "Caught Up" && (workedDate.getWeek() === week) && (element.rrFaxReceived !== null)) ? element.rrFaxReceived : null;

                const row = {
                  ...element.dataValues,
                  // referralId: element.referralId,
                  numMissingAttendance: numMissingAttendance,
                  missingAttendance: missingAttendance,
                  needDc: needDc,
                  eoa: eoa,
                  needPn: needPn,
                  needUca: needUca,
                  lastDOS: lastDOS,
                  caughtUp: caughtUp,
                  worked: worked,
                  workedPrev: workedPrev,
                  rrFaxReceived: rrFaxReceived
                };
                
                return row;
              });
        })
      )
      .then(response => {
        
        res.send(response);
      });
      
      // Promise.all(
      //   data.map(element => {
      //     return Promise.all(
      //       [
      //         // blank appts
      //         VisitView.findAll({
      //             attributes: [
      //               'referralId',
      //             ],
      //             where: {
      //               referralId: element.referralId,
      //               attend: { [Op.is]: null },
      //               dos: { [Op.lt]: tomorrow }
      //             }
      //           })
      //           .then(blankAppts => {
      //             return blankAppts.length;
      //           }),
      //           // future appts
      //           VisitView.findAll({
      //             attributes: [
      //               'referralId',
      //             ],
      //             where: {
      //               referralId: element.referralId,
      //               dos: { [Op.gte]: tomorrow }
      //             }
      //           })
      //           .then(futureAppts => {
      //             return futureAppts.length;
      //           }),
      //           // has appt today
      //           VisitView.findAll({
      //             attributes: [
      //               'referralId',
      //             ],
      //             where: {
      //               referralId: element.referralId,
      //               dos: today
      //             }
      //           })
      //           .then(apptToday => {
      //             return apptToday.length > 0;
      //           }),
      //           // EOA
      //           VisitView.findAll({
      //             attributes: [
      //               'referralId',
      //             ],
      //             where: {
      //               referralId: element.referralId,
      //               attend: { [Op.is]: null }
      //             }
      //           })
      //           .then(eoa => {
      //             return eoa.length === 0;
      //           })
      //       ]
      //     )
        
      //   })
      // )
      // .then(response => {
        
      //   res.send(response);
      // });
      
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
        // where: {
        //     billingStatus: {
        //         [Op.ne]: 'Complete'
        //     }
        // }
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
        ],
        order: [['referralId', 'DESC']]
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

// Find all referrals w/ reminders
exports.findAllReminders = (req, res) => {
    ReferralView.findAll({
        attributes: [
            'referralId',
            'assign', 
            'service', 
            'claimant', 
            'claimNumber',
            'bodyPart',
            'reminderDate',
            'reminderNote',
        ],
        where: {
            reminderDate: {
                [Op.not]: null
            }
        },
        order: [['reminderDate', 'ASC']]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reminders."
      });
    });
};

// Find all Open/Hold/Reschedule for CC dashboard
exports.findAllOpenDashboard = (req, res) => {
  
    const initials1 = req.params.initials.slice(0,2);
    const initials2 = req.params.initials.slice(2,4) || '';

    // console.log(initials1);
    // console.log(initials2);
  
    ReferralView.findAll({
        where: {
          [Op.and]: [
            {[Op.or]: [
            {assign: initials1},
            {assign: initials2},
            ]},
            {[Op.or]: [
              {referralStatus: 'Open'},
              {referralStatus: 'Hold'},
              {referralStatus: 'Reschedule'},
          ] }
          ]
           
        } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving referrals open dashboard."
      });
    });
};

// Find referrals w/ reminders for CC dashboard by CC
exports.findAllRemindersCC = (req, res) => {

    const initials1 = req.params.initials.slice(0,2);
    const initials2 = req.params.initials.slice(2,4) || '';

    ReferralView.findAll({
        attributes: [
            'referralId',
            'assign', 
            'service', 
            'claimant', 
            'claimNumber',
            'bodyPart',
            'reminderDate',
            'reminderNote',
        ],
        where: {
            [Op.or]: [
              {assign: initials1},
              {assign: initials2},
            ],
            reminderDate: {
                [Op.not]: null
            }
        },
        order: [['reminderDate', 'ASC']]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reminders."
      });
    });
};

// Find all referrals w/ reminders for CC dashboard
exports.findAllReminders = (req, res) => {

    ReferralView.findAll({
        attributes: [
            'referralId',
            'assign', 
            'service', 
            'claimant', 
            'claimNumber',
            'bodyPart',
            'reminderDate',
            'reminderNote',
        ],
        where: {
            reminderDate: {
                [Op.not]: null
            }
        },
        order: [['reminderDate', 'ASC']]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reminders."
      });
    });
};

// Find all 14days since last note for CC dashboard by cc
exports.findAll14DaysSinceLastNoteCC = (req, res) => {

  const initials1 = req.params.initials.slice(0,2);
  const initials2 = req.params.initials.slice(2,4) || '';

  const date = new Date();
  const fourteenDaysAgo = date.getDate() - 14;
  date.setDate(fourteenDaysAgo);
  date.setHours(0);

  //query referrals
  ReferralView.findAll({
    attributes: [
        'referralId',
        'assignEmail',
        'claimant',
        'claimNumber',
        'assign',
        'bodyPart',
        'service'
    ],
    where: {
      [Op.and]: {
        [Op.or]: [
          {assign: initials1},
          {assign: initials2}
        ],
        ptStatus: {
          [Op.and]: {
            [Op.not]: null,
            [Op.ne]: 'Discharge',
          }
        },
        billingStatus: {
          [Op.ne]: 'Complete'
        },
        service: {
          [Op.substring]: 'DPT'
        }
      }
    }
  })
  .then(referrals => {

    console.log(referrals.length);

    const resultArray = [];
    const elseArray = [];

    Promise.all(referrals.map(r => {
                          // console.log(r.assign);
                          return ReferralNote.findAll({
                                              attributes: [
                                                  'noteId',
                                                  'timestamp'
                                              ],
                                              where: {
                                                referralId: r.referralId,
                                                initials: r.assign,
                                                // timestamp: {[Op.gt]: date}
                                              },
                                              order: [['timestamp', 'DESC']]
                                            })
                                            .then(notes => {

                                                if (notes.filter(n => n.timestamp > date).length === 0) {
                                                  // add r to the result array
                                                  resultArray.push({...r.dataValues, lastNote: new Date(notes[0].timestamp)})
                                                }
                                                else {
                                                  elseArray.push({...r.dataValues, lastNote: new Date(notes[0].timestamp)})
                                                }
                                            })
                                            .catch(err => {
                                              console.log(err.message || "Some error occurred while retrieving referral notes.");
                                            });
                          
    }))
    .then(result => {
      // console.log("result:", resultArray.length);
      // console.log("else:", elseArray.length);
      res.send(resultArray)
    })
    .catch(err => {
    console.log(err.message || "Some error occurred while retrieving referral notes.");
    });

  })
  .catch(err => {
  console.log(err.message || "Some error occurred while retrieving referrals.");
  });
}

// Find all 14days since last note for CC dashboard
exports.findAll14DaysSinceLastNote = (req, res) => {

  const date = new Date();
  const fourteenDaysAgo = date.getDate() - 14;
  date.setDate(fourteenDaysAgo);
  date.setHours(0);

  //query referrals
  ReferralView.findAll({
    attributes: [
        'referralId',
        'assignEmail',
        'claimant',
        'claimNumber',
        'assign',
        'bodyPart',
        'service'
    ],
    where: {
      [Op.and]: {
        ptStatus: {
          [Op.and]: {
            [Op.not]: null,
            [Op.ne]: 'Discharge',
          }
        },
        billingStatus: {
          [Op.ne]: 'Complete'
        },
        service: {
          [Op.substring]: 'DPT'
        }
      }
    }
  })
  .then(referrals => {

    console.log(referrals.length);

    const resultArray = [];

    Promise.all(referrals.map(r => {
      console.log(r.assign)
                          return ReferralNote.findAll({
                                              attributes: [
                                                  'noteId',
                                                  'timestamp'
                                              ],
                                              where: {
                                                referralId: r.referralId,
                                                initials: r.assign,
                                                // timestamp: {[Op.gt]: date}
                                              },
                                              order: [['timestamp', 'DESC']]
                                            })
                                            .then(notes => {

                                                if (notes.filter(n => n.timestamp > date).length === 0) {
                                                  // add r to the result array
                                                  resultArray.push({...r.dataValues, lastNote: new Date(notes[0].timestamp)})
                                                }
                                            })
                                            .catch(err => {
                                              console.log(err.message || "Some error occurred while retrieving referral notes.");
                                            });
                          
    }))
    .then(result => {
      // return result array
      res.send(resultArray)
    })
    .catch(err => {
    console.log(err.message || "Some error occurred while retrieving referral notes.");
    });

  })
  .catch(err => {
  console.log(err.message || "Some error occurred while retrieving referrals.");
  });
}

// Find all FCE/PPD tomorrow for CC dashboard
exports.findAllFcePpdTomorrowDashboard = (req, res) => {

    const initials1 = req.params.initials.slice(0,2);
    const initials2 = req.params.initials.slice(2,4) || '';

    const today = new Date();
    const isFriday = today.getDay() === 5;

    const tomorrow = new Date();
    const oneDay = tomorrow.getDate() + 1;
    tomorrow.setDate(oneDay);
    tomorrow.setHours(0,0,0,0);

    const twoDaysFromToday = new Date();
    const twoDays = twoDaysFromToday.getDate() + 2;
    twoDaysFromToday.setDate(twoDays);
    twoDaysFromToday.setHours(0,0,0,0);

    const threeDaysFromToday = new Date();
    const threeDays = threeDaysFromToday.getDate() + 3;
    threeDaysFromToday.setDate(threeDays);
    threeDaysFromToday.setHours(0,0,0,0);

    const fourDaysFromToday = new Date();
    const fourDays = fourDaysFromToday.getDate() + 4;
    fourDaysFromToday.setDate(fourDays);
    fourDaysFromToday.setHours(0,0,0,0);

    ReferralView.findAll({
        where: { 
            [Op.and]: [
                {[Op.or]: [
                  {assign: initials1},
                  {assign: initials2}
                ]},
                {
                    service: {
                        [Op.notLike]: '%DPT%'
                    }
                },
                {
                    apptDate: {
                        [Op.lt]: isFriday ? fourDaysFromToday.toISOString() : twoDaysFromToday.toISOString(),
                        [Op.gte]: isFriday ? threeDaysFromToday.toISOString() : tomorrow.toISOString()
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

// Find all FCE/PPD next week for CC dashboard
exports.findAllFcePpdNextWeekDashboard = (req, res) => {

    const initials1 = req.params.initials.slice(0,2);
    const initials2 = req.params.initials.slice(2,4) || '';

    const getWeekNumber = (date) => {
      const currentDate = date ? new Date(date) : new Date();
      const year = currentDate.getFullYear();
      const startDate = new Date(year, 0, 1);
      const days = Math.floor(((currentDate - startDate) / (24 * 60 * 60 * 1000)) + 1);
      return Math.ceil(days / 7);
    };

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const startDate = new Date(year, 0, 1);
    const days = Math.floor(((currentDate - startDate) / (24 * 60 * 60 * 1000)) + 1);
    const currentWeekNumber = Math.ceil(days / 7);

    const today = new Date();

    ReferralView.findAll({
        where: { 
          [Op.or]: [
            {assign: initials1},
            {assign: initials2}
          ],
          service: {[Op.notLike]: '%DPT%'},
          referralStatus: "Complete",
          ptStatus: null
        }})
    .then(data => {
      const filtered = data.filter(d => getWeekNumber(d.apptDate) === (currentWeekNumber + 1))
      // console.log("filtered:", filtered.length)
      // console.log("weekNumber:", getWeekNumber())
      res.send(filtered);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving referrals."
      });
    });
};

// Find all fu/hold for CC dashboard
exports.findAllFollowUpHoldDashboard = (req, res) => {

    const initials1 = req.params.initials.slice(0,2);
    const initials2 = req.params.initials.slice(2,4) || '';

    console.log(initials1);

    ReferralView.findAll({
        where: { 
          [Op.and] : [
            {[Op.or]: [
                {assign: initials1},
                {assign: initials2}
            ]},
            {[Op.or]: [
                {ptStatus: 'Hold'},
                {ptStatus: 'Follow-Up'}
            ]}
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

exports.findAllDashboard = (req, res) => {

  Promise.all([
    // open
    ReferralView.findAll({
        attributes: [
              'referralId',
              'assign', 
              'referralStatus'
        ],
        where: { 
            assign: req.params.initials,
            [Op.or]: [
                {referralStatus: 'Open'},
                {referralStatus: 'Hold'},
                {referralStatus: 'Reschedule'},
            ]  
        } }),
    // reminders
    ReferralView.findAll({
        attributes: [
            'referralId',
            'reminderDate',
        ],
        where: {
            reminderDate: {
                [Op.not]: null
            }
        },
        order: [['reminderDate', 'ASC']]
    }),
    // 14days
    ReferralView.findAll({
    attributes: [
        'referralId',
        'assignEmail',
        'claimant',
        'claimNumber',
        'assign',
        'bodyPart',
        'service'
    ],
    where: {
      [Op.and]: {
        ptStatus: {
          [Op.and]: {
            [Op.not]: null,
            [Op.ne]: 'Discharge',
          }
        },
        billingStatus: {
          [Op.ne]: 'Complete'
        },
        service: {
          [Op.substring]: 'DPT'
        }
      }
    }
  })
  .then(referrals => {

    console.log(referrals.length);

    const resultArray = [];

    Promise.all(referrals.map(r => {
      console.log(r.assign)
                          return ReferralNote.findAll({
                                              attributes: [
                                                  'noteId',
                                                  'timestamp'
                                              ],
                                              where: {
                                                referralId: r.referralId,
                                                initials: r.assign,
                                                // timestamp: {[Op.gt]: date}
                                              },
                                              order: [['timestamp', 'DESC']]
                                            })
                                            .then(notes => {

                                                if (notes.filter(n => n.timestamp > date).length === 0) {
                                                  // add r to the result array
                                                  resultArray.push({...r.dataValues, lastNote: new Date(notes[0].timestamp)})
                                                }
                                            })
                                            .catch(err => {
                                              console.log(err.message || "Some error occurred while retrieving referral notes.");
                                            });
                          
    }))
    .then(result => {
      // return result array
      res.send(resultArray)
    })
    .catch(err => {
    console.log(err.message || "Some error occurred while retrieving referral notes.");
    });

  })

  ]).then(result => {
    res.send(result)
  })
  
}

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