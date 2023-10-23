const cors = require("cors");
const express = require("express");
const schedule = require('node-schedule');
const db = require("./app/models");
const emailjs = require('@emailjs/nodejs');
const { Op } = require("sequelize");
const { sequelize } = require("./app/models");

const Referral = db.referrals;
const ReferralView = db.referralsView;
const ReferralNote = db.referralNotes;
const DptBillingVisit = db.dptBillingVisitsView;

const { ToadScheduler, SimpleIntervalJob, AsyncTask, Task } = require('toad-scheduler');

// const fs = require('fs').promises;
// const path = require('path');
// const process = require('process');
// const {authenticate} = require('@google-cloud/local-auth');
// const {google} = require('googleapis');

// const SCOPES = ['https://www.googleapis.com/auth/drive'];
// const TOKEN_PATH = path.join(process.cwd(), 'token.json');
// const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');


/**
 * Reads previously authorized credentials from the save file.
 */
// async function loadSavedCredentialsIfExist() {
//   try {
//     const content = await fs.readFile(TOKEN_PATH);
//     const credentials = JSON.parse(content);
//     return google.auth.fromJSON(credentials);
//   } catch (err) {
//     return null;
//   }
// }

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 */
// async function saveCredentials(client) {
//   const content = await fs.readFile(CREDENTIALS_PATH);
//   const keys = JSON.parse(content);
//   const key = keys.installed || keys.web;
//   const payload = JSON.stringify({
//     type: 'authorized_user',
//     client_id: key.client_id,
//     client_secret: key.client_secret,
//     refresh_token: client.credentials.refresh_token,
//   });
//   await fs.writeFile(TOKEN_PATH, payload);
// }

/**
 * Load or request or authorization to call APIs.
 */
// async function authorize() {
//   let client = await loadSavedCredentialsIfExist();
//   if (client) {
//     return client;
//   }
//   client = await authenticate({
//     scopes: SCOPES,
//     keyfilePath: CREDENTIALS_PATH,
//   });
//   if (client.credentials) {
//     await saveCredentials(client);
//   }
//   return client;
// }

/**
 * Lists the names and IDs of up to 10 files.
 */
// async function listFiles(authClient) {
//   const drive = google.drive({version: 'v3', auth: authClient});
//   const res = await drive.files.list({
//     pageSize: 10,
//     fields: 'nextPageToken, files(id, name)',
//   });
//   const files = res.data.files;
//   if (files.length === 0) {
//     console.log('No files found.');
//     return;
//   }

//   console.log('Files:');
//   files.map((file) => {
//     console.log(`${file.name} (${file.id})`);
//   });
// }

// async function watchFolder(authClient) {
//   const drive = google.drive({version: 'v3', auth: authClient});
//   const res = await drive.files.watch({
//     fileId: '1f6t2vRMswK9bUIvO44a9Zo57qEOljG3B',
//     // supportsAllDrives: 'true',
//   });
//   // console.log(res.data)
//   // const files = res.data.files;
// }


const app = express();

var corsOptions = {
  origin: "https://smarter-one.vercel.app"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// const db = require("./app/models");
// db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to sMaRtEr.RollUp" });
});

require("./app/routes/adjusters.routes")(app);
require("./app/routes/attorneys.routes")(app);
require("./app/routes/bulkBilling.routes")(app);
require("./app/routes/casemanagers.routes")(app);
require("./app/routes/claimants.routes")(app);
require("./app/routes/clients.routes")(app);
require("./app/routes/employers.routes")(app);
require("./app/routes/physicians.routes")(app);
require("./app/routes/therapists.routes")(app);
require("./app/routes/referralsNotification.routes")(app);
require("./app/routes/referralNotes.routes")(app);
require("./app/routes/dptBillingVisits.routes")(app);
require("./app/routes/dptAuthorization.routes")(app);
require("./app/routes/fceppdBilling.routes")(app);
require("./app/routes/users.routes")(app);
require("./app/routes/user_pto.routes")(app);
require("./app/routes/referral_icd10.routes")(app);
require("./app/routes/lookup_cpt.routes")(app);
require("./app/routes/d1500.routes")(app);
require("./app/routes/d1500Rows.routes")(app);
require("./app/routes/d1500View.routes")(app);
require("./app/routes/bugReports.routes")(app);
require("./app/routes/featureRequests.routes")(app);

require("./app/routes/adjustersView.routes")(app);
require("./app/routes/casemanagersView.routes")(app);
require("./app/routes/claimantsView.routes")(app);
require("./app/routes/referralsView.routes")(app);
require("./app/routes/dptBillingVisitsView.routes")(app);
require("./app/routes/fceppdBillingView.routes")(app);

require("./app/routes/lookup_UsState.routes")(app);

// authorize().then(console.log("Authorization successful")).catch(console.error);
// authorize().then(watchFolder).catch(console.error);

// const scheduler = new ToadScheduler();

// const taskA = new AsyncTask(
//     'async task', 
//     () => { 
//       console.log("10 seconds...");
//       return authorize().then(listFiles).catch(console.error);;
//     },
//     (err) => { /* handle error here */ }
// )

// const jobA = new SimpleIntervalJob({ seconds: 10, }, taskA)

// const task = new Task('simple task', 
// () => { 
//   console.log("every 5 seconds");
// });

// const job = new SimpleIntervalJob({ seconds: 5, }, task);

// scheduler.addSimpleIntervalJob(jobA);

// const path = 'http://localhost:3000';

// test CRON: '0 * * * * *'

// D_DPTFUTrigger Task (6:00AM) (0 6 * * *)
// schedule.scheduleJob('0 6 * * *', function(){

//   // let bucket = [];

//   const date = new Date();
//   console.log('D_DPTFUTrigger', date);

//   //query referrals
//   Referral.findAll({
//       attributes: [
//           'referralId',
//       ],
//       where: {
//         [Op.and]: {
//           ptStatus: 'Active',
//           service: {
//             [Op.substring]: 'DPT'
//           }
//         },
//       }
//   })
//   .then(referrals => {

//     console.log(referrals.length);

//     let i = 0;

//     // for each referral
//     referrals.forEach(r => {

//       //query for numDOS
//       DptBillingVisit.findAll({
//           attributes: [
//               'referralId',
//           ],
//           where: {
//             referralId: r.referralId,
//             dos: {[Op.not]: null}
//           }
//       })
//       .then(visitsDOS => {

//         //query for numAttend
//         DptBillingVisit.findAll({
//             attributes: [
//                 'referralId',
//             ],
//             where: {
//               referralId: r.referralId,
//               attend: {[Op.not]: null}
//             }
//         })
//         .then(visitsAttend => {

//           // if numDOS === numAttend, send to follow-up
//           if (visitsDOS.length === visitsAttend.length && visitsDOS > 0) {
//             console.log(r.referralId, " numDOS: ", visitsDOS.length, ", numAttend: ", visitsAttend.length);
//             bucket.push(r.referralId);
//             console.log("New bucket entry:", bucket[i]);
//             i++;

//             if (r.referralId === 5774) {
//               Referral.update({ptStatus: "Follow-Up", fuHoldNotes: "Need Upcoming appts"}, {
//                 where: { referralId: r.referralId }
//               })
//               .then(x => {
//                 console.log("x", x);
//               })
//             }

//           }
//         });
//       });
//     });
//   })
//   .catch(err => {
//   console.log(err.message || "Some error occurred while retrieving referrals.");
//   });
// });

// D_CCWorkedFUEmail Task (6:15AM) (15 6 * * *)
// schedule.scheduleJob('15 6 * * *', function(){

//   const date = new Date();
//   console.log('D_CCWorkedFUEmail', date);
//   const twoDaysAgo = date.getDate() - 2;
//   date.setDate(twoDaysAgo);
//   date.setHours(0);
  
//   // query referrals
//   ReferralView.findAll({
//     attributes: [
//         'referralId',
//         'assignEmail',
//         'claimantLast',
//         'claimantFirst',
//     ],
//     where: {
//       ccWorked: {
//         [Op.and]: {
//           [Op.not]: null,
//           [Op.lt]: (date),
//         }
//       },
//     }
//   })
//   .then(referrals => {

//     console.log(referrals.length);

//     // for each referral, send email and reset ccWorked
//     referrals.forEach(r => {

//       console.log(r.assignEmail);

//       const params = {
//         to_email: `${r.assignEmail}`,
//         subject: `Follow-Up CC Worked - ${r.claimantLast}, ${r.claimantFirst}`,
//         message: `Click <a href="${path}/${r.referralId}">here</a> to view in smart.`
//       }

//       Referral.update({ccWorked: null}, {
//         where: { referralId: r.referralId }
//       })
//         .then(num => {
//         if (num == 1) {
//             console.log(num);
//             emailjs.send('service_zl67u0w', 'template_a7ve3kt', params, {publicKey: '0mive5-lH56wNnNf7', privateKey: 'T8DWBUrOBVTit5NO7UhTo'})
//              .then((res) => {
//                 console.log(res.status, res.text);
//                 console.log(params);
//              }, (err) => {
//                 console.log(err.text);
//              });
//         } else {
//             console.log(num, `Cannot update referral with id=${id}. Maybe referral was not found or req.body is empty!`);
//         }
//         })
//         .catch(err => {
//           console.log(num, `Error updating referral with id=${id}.`);
//         });
//     });
//   })
//   .catch(err => {
//   console.log(err.message || "Some error occurred while retrieving referrals.");
//   });
// });

// D_CheckNotes14Days Task (6:30AM) (30 6 * * *)
// schedule.scheduleJob('30 6 * * *', function(){

//   const date = new Date();
//   console.log('D_CheckNotes14Days', date);
//   // const fourteenDaysAgo = date.getDate() - 14;
//   // date.setDate(fourteenDaysAgo);
//   // date.setHours(0);

//   //query referrals
//   ReferralView.findAll({
//     attributes: [
//         'referralId',
//         'assignEmail',
//         'claimantLast',
//         'claimantFirst',
//     ],
//     where: {
//       [Op.and]: {
//         ptStatus: {
//           [Op.and]: {
//             [Op.not]: null,
//             [Op.ne]: 'Discharge',
//           }
//         },
//         billingStatus: {
//           [Op.ne]: 'Complete'
//         },
//         service: {
//           [Op.substring]: 'DPT'
//         }
//       }
//     }
//   })
//   .then(referrals => {

//     console.log(referrals.length);

//     referrals.forEach(r => {

//       ReferralNote.findAll({
//         attributes: [
//             'noteId',
//         ],
//         where: {
//           referralId: r.referralId,
//           initials: r.assign,
//           timestamp: {[Op.lte]: date}
//         },
//         // order: [['timestamp', 'DESC']]
//       })
//       .then(notes => {

//         console.log(notes.length);

//           if (notes.length > 0) {

//             const params = {
//               to_email: `${r.assignEmail}`,
//               subject: `14 Days since last note - ${r.claimantLast}, ${r.claimantFirst}`,
//               message: `Click <a href="${path}/${r.referralId}">here</a> to view in smart.`
//             };

//             console.log(params);

//             emailjs.send('service_zl67u0w', 'template_a7ve3kt', params, {publicKey: '0mive5-lH56wNnNf7', privateKey: 'T8DWBUrOBVTit5NO7UhTo'})
//              .then((res) => {
//                 console.log(res.status, res.text);
//                 console.log(params);
//              }, (err) => {
//                 console.log(err.text);
//              });

//           }
//       })
//       .catch(err => {
//         console.log(err.message || "Some error occurred while retrieving referral notes.");
//       });

//     });

//   })
//   .catch(err => {
//   console.log(err.message || "Some error occurred while retrieving referrals.");
//   });
// });

// D_ReminderEmail Task (6:45AM) (45 6 * * *)
// schedule.scheduleJob('45 6 * * *', function(){

//   const today = new Date();
//   console.log('D_ReminderEmail', today);
//   today.setHours(0);

//   // const tomorrow = new Date();
//   // const addDay = tomorrow.getDate() + 1;
//   // tomorrow.setDate(addDay);
//   // tomorrow.setHours(0);
  
//   // query referrals
//   ReferralView.findAll({
//     attributes: [
//         'referralId',
//         'assignEmail',
//         'claimantLast',
//         'claimantFirst',
//     ],
//     where: {
//       reminderDate: today
//     }
//   })
//   .then(referrals => {

//     console.log(referrals.length);

//     // for each referral, send email and set reminderSent timestamp
//     referrals.forEach(r => {

//       console.log(r.assignEmail);

//       const params = {
//         to_email: `${r.assignEmail}`,
//         subject: `F/U - Reminder Email - ${r.claimantLast}, ${r.claimantFirst}`,
//         message: `Click <a href="${path}/${r.referralId}">here</a> to view in smart.`
//       }

//       emailjs.send('service_zl67u0w', 'template_a7ve3kt', params, {publicKey: '0mive5-lH56wNnNf7', privateKey: 'T8DWBUrOBVTit5NO7UhTo'})
//              .then((res) => {
//                 console.log(res.status, res.text);
//                 console.log(params);

//                 Referral.update({reminderSent: today}, {
//                   where: { referralId: r.referralId }
//                 })
//                   .then(num => {
//                   if (num == 1) {
//                       console.log(num);
                      
//                   } else {
//                       console.log(num, `Cannot update referral with id=${id}. Maybe referral was not found or req.body is empty!`);
//                   }
//                   })
//                   .catch(err => {
//                     console.log(num, `Error updating referral with id=${id}.`);
//                   });

//              }, (err) => {
//                 console.log(err.text);
//       });

//     });

//   })
//   .catch(err => {
//   console.log(err.message || "Some error occurred while retrieving referrals.");
//   });
// });

// M_MonthlyDenialsReminder Task (First Monday of month at 7:00AM) (0 7 */100,1-7 * MON)
// schedule.scheduleJob('0 7 */100,1-7 * MON', function(){

//   const today = new Date();
//   console.log('M_MonthlyDenialsReminder', today);
//   today.setHours(0);

//   const params = {
//     to_email: "kmurray@definedpt.com",
//     subject: "Monthly reminder to check DEN/IP/FU payments",
//     message: "Monthly reminder to check DEN/IP/FU payments"
//   }

//   emailjs.send('service_zl67u0w', 'template_a7ve3kt', params, {publicKey: '0mive5-lH56wNnNf7', privateKey: 'T8DWBUrOBVTit5NO7UhTo'})
//           .then((res) => {
//             console.log(res.status, res.text);
//             console.log(params);
//           }, (err) => {
//             console.log(err.text);
//   });
// });

// W_MondayAutoEmailsJTJR Task (Mondays at 8:00AM) (0 8 * * 1)
// schedule.scheduleJob('0 8 * * 1', function(){

//   const today = new Date();
//   console.log('W_MondayAutoEmailsJTJR', today);
//   today.setHours(0);

//   const lastMonday = new Date();
//   const minusSeven = today.getDate() - 7;
//   lastMonday.setDate(minusSeven);
//   lastMonday.setHours(0);

//   // query referrals
//   ReferralView.findAll({
//     attributes: [
//         'claimNumber',
//         'claimantLast',
//         'claimantFirst',
//         'adjuster',
//         'adjusterClient',
//         'reportToAdjuster',
//     ],
//     where: {
//         [Op.and]: {
//           reportToAdjuster: {
//             [Op.between]: [lastMonday, today]
//           },
//           service: {
//             [Op.notLike]: '%DPT%'
//           }
//         },
//       }
//   })
//   .then(referrals => {

//     console.log(referrals.length);

//     const body = `
//       <html>
//           <head>
//               <style>
//                   table, th, td {
//                   border: 1px solid black !important;
//                   }
//                   th {
//                   text-align: center !important;
//                   }
//                   td {
//                   text-align: left !important;
//                   }
//               </style>
//           </head>
//           <body>
//               <table>
//                   <tr>
//                       <td>Claim Number</td>
//                       <td>Claimant</td>
//                       <td>Adjuster</td>
//                       <td>Client</td>
//                       <td>Report to Adj</td>
//                   </tr>
//                   // map here
//                   ${referrals.map(r => {
//                     `<tr>
//                       <td>${r.claimNumber}</td>
//                       <td>${r.claimantLast}, ${r.claimantFirst}</td>
//                       <td>${r.adjuster}</td>
//                       <td>${r.adjusterClient}</td>
//                       <td>${r.reportToAdjuster}</td>
//                     </tr>`
//                   })}
//               </table>
//           </body>
//       </html>
//     `;

//     const params = {
//       to_email: "jrayoni@definedpt.com; jtehas@definedpt.com",
//       cc_email: "wmcclure@definedpt.com",
//       subject: "FCE Reports to Adjuster last week",
//       message: body 
//     };

//     emailjs.send('service_zl67u0w', 'template_a7ve3kt', params, {publicKey: '0mive5-lH56wNnNf7', privateKey: 'T8DWBUrOBVTit5NO7UhTo'})
//             .then((res) => {
//               console.log(res.status, res.text);
//               console.log(params);
//             }, (err) => {
//               console.log(err.text);
//     });

//   })
//   .catch(err => {
//   console.log(err.message || "Some error occurred while retrieving referrals.");
//   });
// });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`ROLLUP Server is running on port ${PORT}.`);
});