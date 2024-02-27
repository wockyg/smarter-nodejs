
// 
// SCHEDULED TASKS
//

const emailjs = require('@emailjs/nodejs');
const db = require("./app/models");
const { Op } = require("sequelize");

const User = db.users;
const RRWeeklyLog = db.rrWeeklyLogs;
const ReferralView = db.referralsView;
const VisitView = db.dptBillingVisitsView;
const Referral = db.referrals;
const ReferralNote = db.referralNotes;

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

// D_resetCovering (Daily @ 6:00AM) (0 6 * * *)
function resetCovering() {

  const date = new Date();
  console.log('D_resetCovering', date);

  User.update({covering: null}, {
      where: { 
        covering: {
          [Op.not]: null
        }
      }
  })
  .then(num => {
    console.log(`covering was reset successfully (${num}).`);
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });
  
}
exports.resetCovering = resetCovering

// D_ucaTrigger Task (Daily @ 6:05AM) (5 6 * * *)
function ucaTrigger() {

  let bucket = [];

  const date = new Date();
  console.log('D_ucaTrigger', date);

  //query for all Active PT referrals
  Referral.findAll({
      attributes: [
          'referralId',
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
  .then(referrals => {

    // console.log(referrals.length);

    // for each referral
    referrals.forEach(r => {

      Promise.all([
        //query for numDOS
        DptBillingVisit.findAll({
            attributes: ['referralId',],
            where: {
              referralId: r.referralId,
              dos: {[Op.not]: null}
            }
        }),
        //query for numAttend
        DptBillingVisit.findAll({
            attributes: ['referralId'],
            where: {
              referralId: r.referralId,
              attend: {[Op.not]: null}
            }
        })
      ])
      .then(nums => {

        // if numDOS === numAttend, send to follow-up
        if (nums[0].length === nums[1].length && nums[0].length > 0) {
          // console.log(r.referralId, " numDOS: ", nums[0].length, ", numAttend: ", nums[1].length);
          bucket.push(r.referralId);
          // console.log("New bucket entry:", r.referralId);
          Referral.update({ptStatus: "Follow-Up", fuHoldNotes: "Need Upcoming appts"}, {
            where: { referralId: r.referralId }
          })
          .then(x => {
            // console.log(`${x} rows updated`);
          })
          .catch(err => {
            console.log(err.message || "Some error occurred while moving referral to FU.");
          });

        }
      });
    });

    console.log(`${bucket.length} rows sent to FU (Need UCA)`)

  })
  .catch(err => {
  console.log(err.message || "Some error occurred while retrieving referrals.");
  });
  
}
exports.ucaTrigger = ucaTrigger

// D_reportsToMD72hrs Task (Daily @ 6:10AM) (10 6 * * *)
function reportsToMD72hrs() {

  const today = new Date();
  console.log('D_reportsToMD72hrs', today);

  today.setHours(0,0,0,0);

  const threeDaysAgo = new Date();
  const threeDays = threeDaysAgo.getDate() - 3;
  threeDaysAgo.setDate(threeDays);
  threeDaysAgo.setHours(0,0,0,0);

  //query referrals
  ReferralView.findAll({
      attributes: [
          'referralId',
          'assign',
          'claimant',
          'claimNumber',
          'reportReceivedDate',
          'reportToPhysician',
          'reportToAdjuster',
      ],
      where: {
        [Op.and]: [
                {confirmAttend: 'Yes'},
                {reportReceivedDate: {[Op.lte]: threeDaysAgo}},
                {reportToPhysician: null},
        ]
      }
  })
  .then(referrals => {
    console.log(referrals.length);
    // console.log(referrals);

    const body = `
      <html>
          <head>
              <style>
                  table, th, td {
                  border: 1px solid black !important;
                  }
                  th {
                  text-align: center !important;
                  }
                  td {
                  text-align: left !important;
                  }
              </style>
          </head>
          <body>
              <table>
                  <tr>
                      <td>CC</td>
                      <td>Claimant</td>
                      <td>Claim Number</td>
                      <td>Report Rec'd</td>
                      <td>Report to Adj</td>
                      <td>Report to MD</td>
                  </tr>
                  ${referrals.map(r => (
                    `<tr>
                      <td>${r.assign}</td>
                      <td>${r.claimant}</td>
                      <td>${r.claimNumber}</td>
                      <td>${r.reportReceivedDate}</td>
                      <td>${r.reportToAdjuster}</td>
                      <td>${r.reportToPhysician}</td>
                    </tr>`
                  ))}
              </table>
          </body>
      </html>
    `;

    const params = {
    //   to_email: "wmcclure@definedpt.com",
      to_email: "acrane@definedpt.com",
      cc_email: "wmcclure@definedpt.com",
      subject: "Reports to MD 72hrs",
      message: body
    };

    // emailjs.send('service_zl67u0w', 'template_a7ve3kt', params, {publicKey: '0mive5-lH56wNnNf7', privateKey: 'T8DWBUrOBVTit5NO7UhTo'})
    //         .then((res) => {
    //           console.log(res.status, res.text);
    //           console.log(params);
    //         }, (err) => {
    //           console.log(err.text);
    // });

    console.log(200);


  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });
  
}
exports.reportsToMD72hrs = reportsToMD72hrs

// D_ccWorkedFUEmail Task (6:15AM) (15 6 * * *)
function ccWorkedFUEmail() {

  const date = new Date();
  console.log('D_CCWorkedFUEmail', date);
  const twoDaysAgo = date.getDate() - 2;
  date.setDate(twoDaysAgo);
  date.setHours(0);
  
  // query referrals
  ReferralView.findAll({
    attributes: [
        'referralId',
        'assignEmail',
        'claimantLast',
        'claimantFirst',
    ],
    where: {
      ccWorked: {
        [Op.and]: {
          [Op.not]: null,
          [Op.lt]: (date),
        }
      },
    }
  })
  .then(referrals => {

    console.log(referrals.length);

    // for each referral, reset ccWorked
    referrals.forEach(r => {

      Referral.update({ccWorked: null}, {
        where: { referralId: r.referralId }
      })
        .then(num => {
          console.log(`${num} rows updated.`);
        })
        .catch(err => {
          console.log(num, `Error updating referral with id=${id}.`);
        });
    });
  })
  .catch(err => {
  console.log(err.message || "Some error occurred while retrieving referrals.");
  });
  
}
exports.ccWorkedFUEmail = ccWorkedFUEmail

// W_rrWeeklyLog Task (Fridays @ 8:00PM) (0 20 * * 5)
function rrWeeklyLog() {

  const date = new Date();
  console.log('W_rrWeeklyLog', date);

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
            'rrPreference',
            'rrFax',
            'rrEmail',
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

      const today = new Date();
      today.setHours(0,0,0,0);
      const todayWeekday = today.getDay();
      // console.log("today:", today)

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(-5,0,0,0);
      // console.log("tomorrow:", tomorrow)

      const weekdayArray = [...Array(todayWeekday + 1).keys()].slice(1);
      // console.log("weekdayArray:", weekdayArray)

      const week = today.getWeek();
      console.log("week:", week)
      const tomWeek = tomorrow.getWeek();
      console.log("tomWeek:", tomWeek)

      const monday = new Date();
      monday.setHours(0,0,0,0);
      monday.setDate(monday.getDate() - (todayWeekday - 1));
      // console.log("monday:", monday)

      const tuesday = new Date();
      tuesday.setHours(0,0,0,0);
      tuesday.setDate(tuesday.getDate() - (todayWeekday - 2));
      // console.log("tuesday:", tuesday)

      const wednesday = new Date();
      wednesday.setHours(0,0,0,0);
      wednesday.setDate(wednesday.getDate() - (todayWeekday - 3));
      // console.log("wednesday:", wednesday)

      const thursday = new Date();
      thursday.setHours(0,0,0,0);
      thursday.setDate(thursday.getDate() - (todayWeekday - 4));
      // console.log("thursday:", thursday)
      
      const friday = new Date();
      friday.setHours(0,0,0,0);
      friday.setDate(friday.getDate() - (todayWeekday - 5));
      // console.log("friday:", friday)
    
    
      Promise.all(
        data.map(element => {

          const workedDate = element.rrLastWorked ? new Date(element.rrLastWorked) : null;
          workedDate && workedDate.setHours(workedDate.getHours() + 5);
          const workedWeek = workedDate ? workedDate.getWeek() : -1;

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
                else if (workedWeek === week) {
                  worked = element.rrLastWorked;
                }

                if (element.rrLastWorked !== null) {
                  if (workedWeek === week) {
                    workedPrev = element.rrLastLastWorked
                  }
                  else {
                    workedPrev = element.rrLastWorked;
                  }
                }

                const rrFaxReceived = (worked !== null && worked !== 'FU/H' && worked !== "Caught Up" && (workedWeek === week) && (element.rrFaxReceived !== null)) ? element.rrFaxReceived : null;

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
                  rrFaxReceived: rrFaxReceived,
                  workedWeek: workedWeek
                };
                
                return row;
              });
        })
      )
      .then(rrRows => {

        console.log(`${rrRows.length} rows successfully processed for rr table.`);

        // rrRows.forEach(r => {
        //     console.log(r.rrLastWorked);
        // })

        // calculate numSent by day
        const numSentMonday = rrRows.filter(r => r.rrLastWorked === monday).length
        const numSentTuesday= rrRows.filter(r => r.rrLastWorked === tuesday).length
        const numSentWednesday = rrRows.filter(r => r.rrLastWorked === wednesday).length
        const numSentThursday = rrRows.filter(r => r.rrLastWorked === thursday).length
        const numSentFriday = rrRows.filter(r => r.rrLastWorked === friday).length

        const numSentTotal = numSentMonday + numSentTuesday + numSentWednesday + numSentThursday + numSentFriday

        const numSentObj = {
          numSentMonday: numSentMonday,
          numSentTuesday: numSentTuesday,
          numSentWednesday: numSentWednesday,
          numSentThursday: numSentThursday,
          numSentFriday: numSentFriday,
          numSentTotal: numSentTotal
        }

        // calculate numReceived by day
        const numReceivedMonday = rrRows.filter(r => r.rrFaxReceived === monday).length
        const numReceivedTuesday= rrRows.filter(r => r.rrFaxReceived === tuesday).length
        const numReceivedWednesday = rrRows.filter(r => r.rrFaxReceived === wednesday).length
        const numReceivedThursday = rrRows.filter(r => r.rrFaxReceived === thursday).length
        const numReceivedFriday = rrRows.filter(r => r.rrFaxReceived === friday).length

        const numReceivedTotal = numReceivedMonday + numReceivedTuesday + numReceivedWednesday + numReceivedThursday + numReceivedFriday

        const numReceivedObj = {
          numReceivedMonday: numReceivedMonday,
          numReceivedTuesday: numReceivedTuesday,
          numReceivedWednesday: numReceivedWednesday,
          numReceivedThursday: numReceivedThursday,
          numReceivedFriday: numReceivedFriday,
          numReceivedTotal: numReceivedTotal
        }

        // calculate # pendingResponse
        const numPending = rrRows.filter(r => r.rrLastWorked !== null && r.workedWeek === week && r.rrFaxReceived === null).length

        // calculate # not worked
        const numNotWorked = rrRows.filter(r => r.worked === null).length

        // calculate # caught up
        const numCaughtUp = rrRows.filter(r => r.caughtUp).length;

        // calculate # fu/h
        const numFUH = rrRows.filter(r => r.worked === 'FU/H').length;

        // comapre with last week?

        // add row to rrWeeklyLogs
        RRWeeklyLog.create({
          ...numSentObj,
          ...numReceivedObj,
          numPending: numPending,
          numNotWorked: numNotWorked,
          numCaughtUp: numCaughtUp,
          numFUH: numFUH
        })
        .then(newLog => {
          // send email to SM and supervisor
          const body = `
            <html>
                <body>
                    <h2><u>Letters Sent This Week</u>: ${newLog.numSentTotal}</h2>
                    <ul>
                      <li>Monday: ${newLog.numSentMonday}</li>
                      <li>Tuesday: ${newLog.numSentTuesday}</li>
                      <li>Wednesday: ${newLog.numSentWednesday}</li>
                      <li>Thursday: ${newLog.numSentThursday}</li>
                      <li>Friday: ${newLog.numSentFriday}</li>
                    </ul>
                </body>
            </html>
          `;

          const params = {
            to_email: "wmcclure@definedpt.com",
            // to_email: "kfulton@definedpt.com",
            // cc_email: "wmcclure@definedpt.com",
            subject: "Records Request Weekly Report",
            message: body
          };

          emailjs.send('service_zl67u0w', 'template_a7ve3kt', params, {publicKey: '0mive5-lH56wNnNf7', privateKey: 'T8DWBUrOBVTit5NO7UhTo'})
                  .then((res) => {
                    // console.log(res.status, res.text);
                    // console.log(params);
                    console.log(`Done.`);
                    return(200);
                  }, (err) => {
                    console.log(err.text);
          });

        })
        .catch(console.log)

      });

    //   console.log(`Done.`);
    //   return(200);
      
    })
    .catch(err => {
      console.log(`Error: ${err}`);
    });
  
}
exports.rrWeeklyLog = rrWeeklyLog

// W_mondayAutoEmailsJTJR Task (Mondays at 8:00AM) (0 8 * * 1)
function mondayAutoEmailsJTJR() {

  const today = new Date();
  console.log('W_mondayAutoEmailsJTJR', today);
  today.setHours(0);

  const lastMonday = new Date();
  const minusSeven = today.getDate() - 7;
  lastMonday.setDate(minusSeven);
  lastMonday.setHours(0);

  // query referrals
  ReferralView.findAll({
    attributes: [
        'claimNumber',
        'claimantLast',
        'claimantFirst',
        'adjuster',
        'adjusterClient',
        'reportToAdjuster',
    ],
    where: {
        [Op.and]: {
          reportToAdjuster: {
            [Op.between]: [lastMonday, today]
          },
          service: {
            [Op.notLike]: '%DPT%'
          }
        },
      }
  })
  .then(referrals => {

    console.log(referrals.length);

    const body = `
      <html>
          <head>
              <style>
                  table, th, td {
                  border: 1px solid black !important;
                  }
                  th {
                  text-align: center !important;
                  }
                  td {
                  text-align: left !important;
                  }
              </style>
          </head>
          <body>
              <table>
                  <tr>
                      <td>Claim Number</td>
                      <td>Claimant</td>
                      <td>Adjuster</td>
                      <td>Client</td>
                      <td>Report to Adj</td>
                  </tr>
                  // map here
                  ${referrals.map(r => {
                    `<tr>
                      <td>${r.claimNumber}</td>
                      <td>${r.claimantLast}, ${r.claimantFirst}</td>
                      <td>${r.adjuster}</td>
                      <td>${r.adjusterClient}</td>
                      <td>${r.reportToAdjuster}</td>
                    </tr>`
                  })}
              </table>
          </body>
      </html>
    `;

    const params = {
      to_email: "wmcclure@definedpt.com",
      // to_email: "jrayoni@definedpt.com; jtehas@definedpt.com",
      // cc_email: "wmcclure@definedpt.com",
      subject: "FCE Reports to Adjuster last week",
      message: body 
    };

    emailjs.send('service_zl67u0w', 'template_a7ve3kt', params, {publicKey: '0mive5-lH56wNnNf7', privateKey: 'T8DWBUrOBVTit5NO7UhTo'})
            .then((res) => {
              console.log(res.status, res.text);
              console.log(params);
            }, (err) => {
              console.log(err.text);
    });

  })
  .catch(err => {
  console.log(err.message || "Some error occurred while retrieving referrals.");
  });
  
}
exports.mondayAutoEmailsJTJR = mondayAutoEmailsJTJR

// M_monthlyDenialsReminder Task (First Monday of month at 7:00AM) (0 7 */100,1-7 * MON)
function monthlyDenialsReminder() {

  const today = new Date();
  console.log('M_monthlyDenialsReminder', today);
  today.setHours(0);

  const params = {
    to_email: "wmcclure@definedpt.com",
    // to_email: "kmurray@definedpt.com",
    subject: "Monthly reminder to check DEN/IP/FU payments",
    message: "Monthly reminder to check DEN/IP/FU payments"
  }

  emailjs.send('service_zl67u0w', 'template_a7ve3kt', params, {publicKey: '0mive5-lH56wNnNf7', privateKey: 'T8DWBUrOBVTit5NO7UhTo'})
          .then((res) => {
            console.log(res.status, res.text);
            console.log(params);
          }, (err) => {
            console.log(err.text);
  });
  
}
exports.monthlyDenialsReminder = monthlyDenialsReminder