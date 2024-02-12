const cors = require("cors");
const express = require("express");
const schedule = require('node-schedule');
const db = require("./app/models");
const emailjs = require('@emailjs/nodejs');
const { Op } = require("sequelize");
const { sequelize } = require("./app/models");

const fs = require('fs-extra');
const googledrive = require('./GoogleDriveAPI');

const path = require('path');
const process = require('process');

const User = db.users;
const RRWeeklyLog = db.rrWeeklyLogs;
const ReferralView = db.referralsView;
const VisitView = db.dptBillingVisitsView;
const Referral = db.referrals;
const ReferralNote = db.referralNotes;


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

// tables
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
// views
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


// 
// test CRON value: '0 * * * * *' //
// 

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

// D_DPTFUTrigger Task (Daily @ 6:05AM) (5 6 * * *)
schedule.scheduleJob('5 6 * * *', function(){

  let bucket = [];

  const date = new Date();
  console.log('D_DPTFUTrigger', date);

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

//     // emailjs.send('service_zl67u0w', 'template_a7ve3kt', params, {publicKey: '0mive5-lH56wNnNf7', privateKey: 'T8DWBUrOBVTit5NO7UhTo'})
//     //         .then((res) => {
//     //           console.log(res.status, res.text);
//     //           console.log(params);
//     //         }, (err) => {
//     //           console.log(err.text);
//     // });
//   })
//   .catch(err => {
//     console.log(`Error: ${err}`);
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

//     // for each referral, reset ccWorked
//     referrals.forEach(r => {

//       Referral.update({ccWorked: null}, {
//         where: { referralId: r.referralId }
//       })
//         .then(num => {
//           console.log(`${num} rows updated.`);
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

// W_rrWeeklyLog Task (Fridays @ 8:00PM) (0 20 * * 5)
// schedule.scheduleJob('0 * * * * *', function(){

//   const date = new Date();
//   console.log('W_rrWeeklyLog', date);

//   ReferralView.findAll({
//         attributes: [
//             'referralId',
//             'assign',
//             'service',
//             'claimant',
//             'claimNumber',
//             'claimantBirthDate',
//             'therapistPhone',
//             'therapistFax',
//             'therapistId',
//             'therapistBeaver',
//             'ptStatus',
//             'fuHoldNotes',
//             'bodyPart',
//             'rrLastLastWorked',
//             'rrLastWorked',
//             'ccWorked',
//             'rrFaxReceived',
//             'rrPreference',
//             'rrFax',
//             'rrEmail',
//             'rrPhone',
//         ],
//         where: { 
//             service: {
//               [Op.like]: '%DPT%'
//             },
//             ptStatus: {
//               [Op.ne]: 'Discharge',
//               [Op.not]: null
//             }
//         }
//     })
//     .then(data => {

//       // Returns the ISO week of the date.
//       Date.prototype.getWeek = function() {
//         var date = new Date(this.getTime());
//         date.setHours(0, 0, 0, 0);
//         // Thursday in current week decides the year.
//         date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
//         // January 4 is always in week 1.
//         var week1 = new Date(date.getFullYear(), 0, 4);
//         // Adjust to Thursday in week 1 and count number of weeks from date to week1.
//         return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
//                               - 3 + (week1.getDay() + 6) % 7) / 7);
//       }

//       const today = new Date();
//       today.setHours(0,0,0,0);
//       const todayWeekday = today.getDay();
//       // console.log("today:", today)

//       const tomorrow = new Date();
//       tomorrow.setDate(tomorrow.getDate() + 1);
//       tomorrow.setHours(-5,0,0,0);
//       // console.log("tomorrow:", tomorrow)

//       const weekdayArray = [...Array(todayWeekday + 1).keys()].slice(1);
//       // console.log("weekdayArray:", weekdayArray)

//       const week = today.getWeek();
//       // console.log("week:", week)
//       const tomWeek = tomorrow.getWeek();
//       // console.log("tomWeek:", tomWeek)

//       const monday = new Date();
//       monday.setHours(0,0,0,0);
//       monday.setDate(monday.getDate() - (todayWeekday - 1));
//       // console.log("monday:", monday)

//       const tuesday = new Date();
//       tuesday.setHours(0,0,0,0);
//       tuesday.setDate(tuesday.getDate() - (todayWeekday - 2));
//       // console.log("tuesday:", tuesday)

//       const wednesday = new Date();
//       wednesday.setHours(0,0,0,0);
//       wednesday.setDate(wednesday.getDate() - (todayWeekday - 3));
//       // console.log("wednesday:", wednesday)

//       const thursday = new Date();
//       thursday.setHours(0,0,0,0);
//       thursday.setDate(thursday.getDate() - (todayWeekday - 4));
//       // console.log("thursday:", thursday)
      
//       const friday = new Date();
//       friday.setHours(0,0,0,0);
//       friday.setDate(friday.getDate() - (todayWeekday - 5));
//       // console.log("friday:", friday)
    
    
//       Promise.all(
//         data.map(element => {

//           const workedDate = new Date(element.rrLastWorked);
//           workedDate.setHours(workedDate.getHours() + 5);
//           const workedWeek = workedDate.getWeek();

//           return VisitView.findAll({
//                 attributes: [
//                   'referralId',
//                   'dos',
//                   'dosTime',
//                   'attend',
//                   'needPN',
//                   'notesReceived'
//                 ],
//                 where: {
//                   referralId: element.referralId,
//                 },
//                 order: [['dos', 'DESC']]
//               })
//               .then(appts => {

//                 const missingAttendance = appts.filter(a => {
//                   return a.attend === null && 
//                          a.dos !== null && 
//                          new Date(a.dos) < tomorrow
//                 })
//                 .map(r => {return {dos: r.dos, dosTime: r.dosTime}});

//                 const numMissingAttendance = missingAttendance.length;
                
//                 const numFutureAppts = appts.filter(a => new Date(a.dos) > tomorrow).length;
                
//                 const pn = appts.filter(a => {
//                   return new Date(a.dos) < tomorrow && 
//                          a.dos !== null && 
//                          a.needPN !== null && 
//                          a.notesReceived !== 'Progress' && 
//                          a.notesReceived !== 'Re-Eval' && 
//                          a.notesReceived !== 'Discharge'
//                 });

//                 const needPn1 = pn.length > 0 && pn[0]?.notesReceived !== 'Progress' && pn[0]?.notesReceived !== 'Re-Eval' && pn[0]?.notesReceived !== 'Discharge';
              
//                 const needDc = element.fuHoldNotes === 'Need DC note' && element.ptStatus !== 'Active';

//                 const lastDOS = appts.filter(a => a.dos !== null)[0].dos;

                
//                 const numBlankAppts = appts.filter(a => a.attend === null && a.dos !== null).length; 
//                 const numBlankDOS = appts.filter(a => a.attend === null && a.dos === null).length; 

//                 const eoa = (numBlankDOS === 0) && ((numBlankAppts === 0) || ((numBlankAppts > 0) && (appts[0].dos !== null && new Date(appts[0].dos) < tomorrow))) && !needDc;
                
//                 const needPn = needPn1 && !needDc && !eoa;

//                 const needUca = numFutureAppts === 0 && !needDc && !eoa;
                
//                 const caughtUp = numMissingAttendance === 0 && !eoa && !needUca && !needPn && !needDc;

//                 let worked = null;

//                 let workedPrev = null;

//                 if (caughtUp) {
//                   worked = "Caught Up";
//                 }
//                 else if (element.ccWorked !== null) {
//                    worked = "*CC";
//                 }
//                 else if ((element.ptStatus === "Follow-Up" || element.ptStatus === "Hold") && 
//                           element.fuHoldNotes !== "Need DC note" && 
//                           element.fuHoldNotes !== "Need Upcoming appts" && 
//                           element.fuHoldNotes !== "Pending PN") {

//                    worked = "FU/H";
//                 }
//                 else if (workedWeek === week) {
//                   worked = element.rrLastWorked;
//                 }

//                 if (element.rrLastWorked !== null) {
//                   if (workedWeek === week) {
//                     workedPrev = element.rrLastLastWorked
//                   }
//                   else {
//                     workedPrev = element.rrLastWorked;
//                   }
//                 }

//                 const rrFaxReceived = (worked !== null && worked !== 'FU/H' && worked !== "Caught Up" && (workedDate.getWeek() === week) && (element.rrFaxReceived !== null)) ? element.rrFaxReceived : null;

//                 const row = {
//                   ...element.dataValues,
//                   // referralId: element.referralId,
//                   numMissingAttendance: numMissingAttendance,
//                   missingAttendance: missingAttendance,
//                   needDc: needDc,
//                   eoa: eoa,
//                   needPn: needPn,
//                   needUca: needUca,
//                   lastDOS: lastDOS,
//                   caughtUp: caughtUp,
//                   worked: worked,
//                   workedPrev: workedPrev,
//                   rrFaxReceived: rrFaxReceived
//                 };
                
//                 return row;
//               });
//         })
//       )
//       .then(rrRows => {

//         console.log(`${rrRows.length} rows successfully processed for rr table.`);

//         // calculate numSent by day
//         const numSentMonday = rrRows.filter(r => r.rrLastWorked === monday).length
//         const numSentTuesday= rrRows.filter(r => r.rrLastWorked === tuesday).length
//         const numSentWednesday = rrRows.filter(r => r.rrLastWorked === wednesday).length
//         const numSentThursday = rrRows.filter(r => r.rrLastWorked === thursday).length
//         const numSentFriday = rrRows.filter(r => r.rrLastWorked === friday).length

//         const numSentTotal = numSentMonday + numSentTuesday + numSentWednesday + numSentThursday + numSentFriday

//         const numSentObj = {
//           numSentMonday: numSentMonday,
//           numSentTuesday: numSentTuesday,
//           numSentWednesday: numSentWednesday,
//           numSentThursday: numSentThursday,
//           numSentFriday: numSentFriday,
//           numSentTotal: numSentTotal
//         }

//         // calculate numReceived by day
//         const numReceivedMonday = rrRows.filter(r => r.rrFaxReceived === monday).length
//         const numReceivedTuesday= rrRows.filter(r => r.rrFaxReceived === tuesday).length
//         const numReceivedWednesday = rrRows.filter(r => r.rrFaxReceived === wednesday).length
//         const numReceivedThursday = rrRows.filter(r => r.rrFaxReceived === thursday).length
//         const numReceivedFriday = rrRows.filter(r => r.rrFaxReceived === friday).length

//         const numReceivedTotal = numReceivedMonday + numReceivedTuesday + numReceivedWednesday + numReceivedThursday + numReceivedFriday

//         const numReceivedObj = {
//           numReceivedMonday: numReceivedMonday,
//           numReceivedTuesday: numReceivedTuesday,
//           numReceivedWednesday: numReceivedWednesday,
//           numReceivedThursday: numReceivedThursday,
//           numReceivedFriday: numReceivedFriday,
//           numReceivedTotal: numReceivedTotal
//         }

//         // calculate # pendingResponse
//         const numPending = rrRows.filter(r => r.rrLastWorked.getWeek() === week && r.rrFaxReceived === null).length

//         // calculate # not worked
//         const numNotWorked = rrRows.filter(r => r.worked === null).length

//         // calculate # caught up
//         const numCaughtUp = rrRows.filter(r => r.caughtUp).length;

//         // calculate # fu/h
//         const numFUH = rrRows.filter(r => r.worked === 'FU/H').length;

//         // comapre with last week?

//         // add row to rrWeeklyLogs
//         RRWeeklyLog.create({
//           ...numSentObj,
//           ...numReceivedObj,
//           numPending: numPending,
//           numNotWorked: numNotWorked,
//           numCaughtUp: numCaughtUp,
//           numFUH: numFUH
//         })
//         .then(newLog => {
//           // send email to SM and supervisor
//           const body = `
//             <html>
//                 <body>
//                     <h2><u>Letters Sent This Week</u>: ${newLog.numSentTotal}</h2>
//                     <ul>
//                       <li>Monday: ${newLog.numSentMonday}</li>
//                       <li>Tuesday: ${newLog.numSentTuesday}</li>
//                       <li>Wednesday: ${newLog.numSentWednesday}</li>
//                       <li>Thursday: ${newLog.numSentThursday}</li>
//                       <li>Friday: ${newLog.numSentFriday}</li>
//                     </ul>
//                 </body>
//             </html>
//           `;

//           const params = {
//             to_email: "wmcclure@definedpt.com",
//             // to_email: "kfulton@definedpt.com",
//             // cc_email: "wmcclure@definedpt.com",
//             subject: "Records Request Weekly Report",
//             message: body
//           };

//           emailjs.send('service_zl67u0w', 'template_a7ve3kt', params, {publicKey: '0mive5-lH56wNnNf7', privateKey: 'T8DWBUrOBVTit5NO7UhTo'})
//                   .then((res) => {
//                     // console.log(res.status, res.text);
//                     // console.log(params);
//                     console.log(`Done.`);
//                     return(200);
//                   }, (err) => {
//                     console.log(err.text);
//           });

//         })
//         .catch(console.log)

//       });

//       // console.log(`Done.`);
//       // return(200);
      
//     })
//     .catch(err => {
//       console.log(`Error: ${err}`);
//     });
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
//       to_email: "wmcclure@definedpt.com",
//       // to_email: "jrayoni@definedpt.com; jtehas@definedpt.com",
//       // cc_email: "wmcclure@definedpt.com",
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

// M_MonthlyDenialsReminder Task (First Monday of month at 7:00AM) (0 7 */100,1-7 * MON)
// schedule.scheduleJob('0 7 */100,1-7 * MON', function(){

//   const today = new Date();
//   console.log('M_MonthlyDenialsReminder', today);
//   today.setHours(0);

//   const params = {
//     to_email: "wmcclure@definedpt.com",
//     // to_email: "kmurray@definedpt.com",
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

// set port, listen for requests

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`ROLLUP Server is running on port ${PORT}.`);
});