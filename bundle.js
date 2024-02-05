'use strict';

const cors = require("cors");
const express = require("express");
const schedule = require('node-schedule');
const db = require("./app/models");
require('@emailjs/nodejs');
const { Op } = require("sequelize");
require("./app/models");

const User = db.users;
db.rrWeeklyLogs;

db.referrals;
db.referralsView;
db.referralNotes;
db.dptBillingVisitsView;

require('fs-extra');
require('./GoogleDriveAPI');

require('path');
const process = require('process');


// ---------------- Google Drive API / PDF.co test code ------------------ //
//----------------------------------------------------------------------//
//                                                                      //

// const { google } = require('googleapis');
// const apikey = require('./apikey.json');

// const SCOPE = ['https://www.googleapis.com/auth/drive'];

// const { create } = require('apisauce')

// const PDF_KEY = "wmcclure1016@gmail.com_aS4kX75jUGkH4v5kgJcismLadY2SE3mY5TwKHjc3CU2BV8uqi0332QfIN274kf5vmvRBis84pS75i5uGnPs8ym2HS3mmQA8373JnNW306m0oW4yisXD0K6134d3X16XrG09Q0kLHpT9Rqme4aqTXqrcGQV";

// const fileLink = 'https://drive.google.com/file/d/1S63C8NZD4oFRAC314H7p-bQSGz031T-J/view?usp=drive_link'

// define the api
// const api = create({
//   baseURL: 'https://api.pdf.co/v1',
//   headers: { 
//     "x-api-key": PDF_KEY,
//     "Content-Type": 'application/octet-stream'
//   },
// })

// async function authorize() {
//   const jwtClient = new google.auth.JWT(
//     apikey.client_email,
//     null,
//     apikey.private_key,
//     SCOPE
//   );
//   await jwtClient.authorize();
//   return jwtClient;
// }

// async function uploadFile(authClient) {

//   return new Promise((resolve, reject) => {

//     const drive = google.drive({version: 'v3', auth: authClient});

//     const fileMetaData = {
//       name: "test123Boom",
//       parents: ["1B7Wt6fl5Gevvray3hu9k0s5S9rHwbFgy"]
//     }

//     drive.files.create({
//       resource: fileMetaData,
//       media: {
//         body: fs.createReadStream('./winnerWinner.txt')
//       },
//       fields: 'id',
//       supportsAllDrives: true
//     }, function(err, file){
//       if (err) {
//         console.log('FAIL....')
//         return reject(err);
//       }
//       console.log('SUCCESS!!')
//       resolve(file)
//     })
//   })
// }

// async function searchFolder(authClient) {

//   const folderId = '1B7Wt6fl5Gevvray3hu9k0s5S9rHwbFgy'; // !Smarter folder in SharedDrive 1DcQT9tx8ktXBG0a-mVF9yW4yEQnvCn2t
//   const folderId_Inbound = '1pSGnEyk4o2OjWzFTmvaYxZrdQIiiLz-j'; // InBound 1500s (NEEW) folder in SharedDrive
//   const folderId2 = '11Nu8UkSSSBzSdNjmtWe67roaGcnwt_95'; //folder in MyDrive
//   const folderId3 = '0AMmDAWFgfc9KUk9PVA'; //SharedDrive root folder

//   return new Promise((resolve, reject) => {

//     const drive = google.drive({version: 'v3', auth: authClient});

//     const files = [];

//     drive.files.list({
//       q: `'${folderId_Inbound}' in parents`, 
//       supportsAllDrives: true,
//       includeItemsFromAllDrives: true,
//       // driveId: '0AMmDAWFgfc9KUk9PVA'
//     }).then(res => {
//       console.log(res)
//       res.data.files.forEach(f => {
//         console.log("okayyyyyyyyyy")
//         files.push(f);
//       })
//       files.map(f => console.log(f))
//       resolve(res);
//     }).catch(err => reject(err))
//   })
// }

// async function moveFile(authClient) {

//   const source_folderId = '17TgrR79PGv6I5AnwYJU-M9hfkkqWxwa4'; // BillMachineIn folder in SharedDrive
//   const target_folderId = '17KdAnx0g6ADf8RqkpJtRJtsQibk1l8_z'; // BillMachineOut folder in SharedDrive 17TgrR79PGv6I5AnwYJU-M9hfkkqWxwa4

//   return new Promise((resolve, reject) => {

//     const drive = google.drive({version: 'v3', auth: authClient});

//     drive.files.list({
//       q: `'${source_folderId}' in parents and mimeType != 'application/vnd.google-apps.folder'`, 
//       supportsAllDrives: true,
//       includeItemsFromAllDrives: true,
//       // driveId: '0AMmDAWFgfc9KUk9PVA'
//     }).then(res => {

//       res.data.files.map(f => console.log(f));
//       console.log("0 id:", res.data.files[0].id)
//       console.log(res);

//       // resolve(res);

//       console.log("................")
//       console.log("................")
//       console.log("................")
//       console.log("Updating File........")
//       console.log("................")
//       console.log("................")
//       console.log("................")

//       drive.files.update({
//         fileId: res.data.files[0].id,
//         supportsAllDrives: true,
//         addParents: target_folderId,
//         removeParents: source_folderId
//       })
//       .then(res2 => {
//         console.log("yippee!!");
//         console.log(res2);
//         resolve(res2);
//       })
//       .catch(err => reject(err))

//     }).catch(err => reject(err))
//   })
// }

// async function splitFile(authClient) {

//   const source_folderId = '17TgrR79PGv6I5AnwYJU-M9hfkkqWxwa4'; // BillMachineIn folder in SharedDrive
//   const target_folderId = '17KdAnx0g6ADf8RqkpJtRJtsQibk1l8_z'; // BillMachineOut folder in SharedDrive 17TgrR79PGv6I5AnwYJU-M9hfkkqWxwa4

//   return new Promise((resolve, reject) => {

//     const drive = google.drive({version: 'v3', auth: authClient});

//     drive.files.list({
//       q: `'${source_folderId}' in parents and mimeType != 'application/vnd.google-apps.folder'`, 
//       supportsAllDrives: true,
//       includeItemsFromAllDrives: true,
//       // driveId: '0AMmDAWFgfc9KUk9PVA'
//     }).then(res => {

//       res.data.files.map(f => console.log(f));
//       // console.log("0 id:", res.data.files[0].id)
//       // console.log(res);

//       // resolve(res);

//       console.log("................")
//       console.log("................")
//       console.log("................")
//       console.log("Uploading File........")
//       console.log("................")
//       console.log("................")
//       console.log("................")

//       api
//         .get('/file/upload/get-presigned-url')
//         .then(res2 => {
//           console.log(res2.data.presignedUrl)
//           fs.readFile('./testFile.pdf', (err, data) => {
//             console.log("FILE READ SUCCESS");
//             api.put(res2.data.presignedUrl, data)
//                .then( res3 => {
//                 console.log(res3.status)
//                 api.post('/pdf/split', {
//                   url: res3.config.url,
//                   pages: '1-2,3-',
//                   inline: true,
//                   name: "splitter.pdf",
//                   async: false
//                 })
//                })
//                .catch(err => reject(err));
               
//           })
//         })

//     }).catch(err => reject(err))
//   })
// }

// const filePath = `./temp/pleaseUpload.pdf`;
// const dest = fs.createWriteStream(filePath);

// googledrive.authorize()
//            .then(token => {
//             googledrive.getFileTest(token)
//                        .then(res => {
//                         res.data.pipe(dest);
//                        })
//                        .catch("BOOBOO STANK");
//            })
//            .catch("BOOBOO STANK");

//                                                                    //
//--------------------------------------------------------------------//
// ---------------- END Google Drive API / PDF.co test code ------------------ //


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
require("./app/routes/v1500.routes")(app);
require("./app/routes/v1500Rows.routes")(app);
require("./app/routes/v1500.routes")(app);
require("./app/routes/v1500Rows.routes")(app);
require("./app/routes/bugReports.routes")(app);
require("./app/routes/featureRequests.routes")(app);
require("./app/routes/timestamps.routes")(app);

require("./app/routes/adjustersView.routes")(app);
require("./app/routes/casemanagersView.routes")(app);
require("./app/routes/claimantsView.routes")(app);
require("./app/routes/referralsView.routes")(app);
require("./app/routes/dptBillingVisitsView.routes")(app);
require("./app/routes/fceppdBillingView.routes")(app);
require("./app/routes/d1500RowsView.routes")(app);
require("./app/routes/d1500View.routes")(app);
require("./app/routes/v1500RowsView.routes")(app);
require("./app/routes/v1500View.routes")(app);
require("./app/routes/map.routes")(app);


// const { ToadScheduler, SimpleIntervalJob, AsyncTask, Task } = require('toad-scheduler');

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


// test CRON value: '0 * * * * *' //


// D_resetCovering Task (Daily @ 6:00AM) (0 6 * * *)
schedule.scheduleJob('0 6 * * *', function(){

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

});

// D_reportsToMD72hrs Task (Daily @ 6:10AM) (10 6 * * *)
// schedule.scheduleJob('10 6 * * *', function(){

//   const today = new Date();
//   console.log('D_reportsToMD72hrs', today);

//   today.setHours(0,0,0,0);

//   const threeDaysAgo = new Date();
//   const threeDays = threeDaysAgo.getDate() - 3;
//   threeDaysAgo.setDate(threeDays);
//   threeDaysAgo.setHours(0,0,0,0);

//   //query referrals
//   ReferralView.findAll({
//       attributes: [
//           'referralId',
//           'assign',
//           'claimant',
//           'claimNumber',
//           'reportReceivedDate',
//           'reportToPhysician',
//           'reportToAdjuster',
//       ],
//       where: {
//         [Op.and]: [
//                 {confirmAttend: 'Yes'},
//                 {reportReceivedDate: {[Op.lte]: threeDaysAgo}},
//                 {reportToPhysician: null},
//         ]
//       }
//   })
//   .then(referrals => {
//     console.log(referrals.length);
//     // console.log(referrals);

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
//                       <td>CC</td>
//                       <td>Claimant</td>
//                       <td>Claim Number</td>
//                       <td>Report Rec'd</td>
//                       <td>Report to Adj</td>
//                       <td>Report to MD</td>
//                   </tr>
//                   ${referrals.map(r => (
//                     `<tr>
//                       <td>${r.assign}</td>
//                       <td>${r.claimant}</td>
//                       <td>${r.claimNumber}</td>
//                       <td>${r.reportReceivedDate}</td>
//                       <td>${r.reportToAdjuster}</td>
//                       <td>${r.reportToPhysician}</td>
//                     </tr>`
//                   ))}
//               </table>
//           </body>
//       </html>
//     `;

//     const params = {
//       to_email: "acrane@definedpt.com",
//       cc_email: "wmcclure@definedpt.com",
//       subject: "Reports to MD 72hrs",
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
//     console.log(`Error: ${err}`);
//   });

// });

// W_rrWeeklyLog Task (Fridays @ 8:00PM) (0 20 * * 5)
// schedule.scheduleJob('0 * * * * *', function(){

  // const date = new Date();
  // console.log('W_rrWeeklyLog', date);

  // pull RR endpoint
  // referralsView.recordsRequest()
  // .then(res => {
  //   // add all rows to rrWeeklyLogs
  //   Promise.all(res.map(r => {
  //     return (
  //       RRWeeklyLog.create({referralId: r.referralId, rrLastWorked: r.rrLastWorked, rrFaxReceived: r.rrFaxReceived})
  //       .catch(err => {
  //         console.log(`Error adding row to rrWeeklyLog: ${err}`);
  //       })
  //     );
  //   }))
  //   .then(result => {
  //     console.log(`Done. ${result.length} rows successfully added to rrWeeklyLog.`);
  //   })
  // })
  // .catch(err => {
  //   console.log(`Error retrieving RR report: ${err}`);
  // });
// });



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
//   const fourteenDaysAgo = date.getDate() - 14;
//   date.setDate(fourteenDaysAgo);
//   date.setHours(0);

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
