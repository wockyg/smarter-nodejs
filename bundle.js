'use strict';

const cors = require("cors");
const express = require("express");

require('node-schedule');
require('./tasks');

const process = require('process');


// ---------------- Google Drive API / PDF.co / toadScheduler test code ------------------ //
//----------------------------------------------------=------------------------------------//
//                                                                                         //

// const fs = require('fs-extra');
// const googledrive = require('./GoogleDriveAPI');
// const { google } = require('googleapis');
// const apikey = require('./apikey.json');
// const path = require('path');

// const SCOPE = ['https://www.googleapis.com/auth/drive'];

// const { create } = require('apisauce')

// const fileLink = 'https://drive.google.com/file/d/1S63C8NZD4oFRAC314H7p-bQSGz031T-J/view?usp=drive_link'

// define the api
// const api = create({
//   baseURL: 'https://api.pdf.co/v1',
//   headers: { 
//     "x-api-key": process.env.PDF_KEY,
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
 


// TOAD SCHEDULER CODE
// 

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

// const path = process.env.ORIGIN;

//                                                                                             //
//---------------------------------------------------------------------------------------------//
// ---------------- END Google Drive API / PDF.co / toadScheduler test code ------------------ //


const app = express();

var corsOptions = {
  origin: process.env.ORIGIN
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


//            ROUTES              //
// -------------------------------//

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

// simple route
app.get("/", (req, res) => {
  res.json({ message: "WeLcOmE tO sMaRtEr.RollUp" });
});


//            TASKS               //
// -------------------------------//
// test CRON value: '0 * * * * *' //

// D_resetCovering Task (Daily @ 6:00AM) (0 6 * * *)
// schedule.scheduleJob('0 6 * * *', tasks.resetCovering);

// D_ucaTrigger Task (Daily @ 6:05AM) (5 6 * * *)
// schedule.scheduleJob('5 6 * * *', tasks.ucaTrigger);

// D_reportsToMD72hrs Task (Daily @ 6:10AM) (10 6 * * *)
// schedule.scheduleJob('10 6 * * *', tasks.reportsToMD72hrs);

// D_ccWorkedFUEmail Task (6:15AM) (15 6 * * *)
// schedule.scheduleJob('15 6 * * *', tasks.ccWorkedFUEmail);

// W_rrWeeklyLog Task (Fridays @ 8:00PM) (0 20 * * 5)
// schedule.scheduleJob('0 20 * * 5', tasks.rrWeeklyLog);

// W_MondayAutoEmailsJTJR Task (Mondays at 8:00AM) (0 8 * * 1)
// schedule.scheduleJob('0 8 * * 1', tasks.mondayAutoEmailsJTJR);

// M_MonthlyDenialsReminder Task (First Monday of month at 7:00AM) (0 7 */100,1-7 * MON)
// schedule.scheduleJob('0 7 */100,1-7 * MON', tasks.monthlyDenialsReminder);

// set port, listen for requests


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`ROLLUP Server is running on port ${PORT}.`);
});
