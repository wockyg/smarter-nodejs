import cors from "cors";
import express, { json, urlencoded } from "express";
import schedule from 'node-schedule';
import { referralsView, referralNotes } from "./app/models";
import emailjs from '@emailjs/nodejs';
import { Op } from "sequelize";
import { dptBillingVisits, sequelize } from "./app/models";

const Referral = referralsView;
const ReferralNote = referralNotes;

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// const db = require("./app/models");
// db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to sMaRtEr.RollUp" });
});

require("./app/routes/adjusters.routes")(app);
require("./app/routes/attorneys.routes")(app);
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

require("./app/routes/adjustersView.routes")(app);
require("./app/routes/casemanagersView.routes")(app);
require("./app/routes/claimantsView.routes")(app);
require("./app/routes/referralsView.routes")(app);
require("./app/routes/dptBillingVisitsView.routes")(app);
require("./app/routes/fceppdBillingView.routes")(app);

require("./app/routes/lookup_UsState.routes")(app);

const path = 'http://localhost:3000';

// D_CCWorkedFUEmail Task (6:00AM) (0 6 * * *)
// schedule.scheduleJob('0 6 * * *', function(){

//   const date = new Date();
//   console.log('D_CCWorkedFUEmail', date);
//   const twoDaysAgo = date.getDate() - 2;
//   date.setDate(twoDaysAgo);
//   date.setHours(0);

//   //query referrals
//   Referral.findAll({
//     where: {
//       ccWorked: {
//         [Op.and]: {
//           [Op.not]: null,
//           [Op.lt]: (date),
//         }
//       },
//     }
//   })
//   .then(data => {

//     console.log(data.length);

//     // for each referral, send email and reset ccWorked
//     data.forEach(e => {

//       console.log(e.assignEmail);

//       const params = {
//         to_email: `${e.assignEmail}`,
//         subject: `Follow-Up CC Worked - ${e.claimantLast}, ${e.claimantFirst}`,
//         message: `Click <a href="${path}/${e.referralId}">here</a> to view in smart.`
//       }
      
//       // emailjs.send('service_zl67u0w', 'template_a7ve3kt', params, {publicKey: '0mive5-lH56wNnNf7', privateKey: 'T8DWBUrOBVTit5NO7UhTo'})
//       //        .then((res) => {
//       //           console.log(res.status, res.text);
//       //           console.log(params);
//       //        }, (err) => {
//       //           console.log(err.text);
//       //        });

//       // Referral.update({ccWorked: null}, {
//       //   where: { referralId: e.referralId }
//       // })
//       //   .then(num => {
//       //   if (num == 1) {
//       //       console.log(num);
//       //   } else {
//       //       console.log(num, `Cannot update referral with id=${id}. Maybe referral was not found or req.body is empty!`);
//       //   }
//       //   })
//       //   .catch(err => {
//       //     console.log(num, `Error updating referral with id=${id}.`);
//       //   });
//     });
//   })
//   .catch(err => {
//   console.log(err.message || "Some error occurred while retrieving referrals.");
//   });
// });

// D_CheckNotes14Days Task (6:15AM) (15 6 * * *)
// schedule.scheduleJob('15 6 * * *', function(){

//   const date = new Date();
//   console.log('D_CheckNotes14Days', date);
//   const fourteenDaysAgo = date.getDate() - 14;
//   date.setDate(fourteenDaysAgo);
//   date.setHours(0);

//   //query referrals
//   Referral.findAll({
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
//   .then(data => {

//     console.log(data.length);

//     data.forEach(e => {

//       ReferralNote.findAll({
//         where: {
//           referralId: e.referralId,
//           initials: e.assign,
//           timestamp: {[Op.lte]: date}
//         },
//         order: [['timestamp', 'DESC']]
//       })
//       .then(notes => {
//         console.log(notes.length);
//           if (notes.length > 0) {
            // const params = {
            //   to_email: `${e.assignEmail}`,
            //   subject: `14 Days since last note - ${e.claimantLast}, ${e.claimantFirst}`,
            //   message: `Click <a href="${path}/${e.referralId}">here</a> to view in smart.`
            // };

//             console.log(params);

//             // emailjs.send('service_zl67u0w', 'template_a7ve3kt', params, {publicKey: '0mive5-lH56wNnNf7', privateKey: 'T8DWBUrOBVTit5NO7UhTo'})
//             //  .then((res) => {
//             //     console.log(res.status, res.text);
//             //     console.log(params);
//             //  }, (err) => {
//             //     console.log(err.text);
//             //  });
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

// D_DPTFUTrigger Task (6:30AM) (30 6 * * *)
// schedule.scheduleJob('0 * * * * *', function(){

//   let numDOS, numAttend;

//   let bucket = [];

//   const date = new Date();
//   console.log('D_DPTFUTrigger', date);

//   //query referrals
//   Referral.findAll({
//     where: {
//       [Op.and]: {
//         ptStatus: 'Active',
//         service: {
//           [Op.substring]: 'DPT'
//         }
//       },
//     }
//   })
//   .then(data => {

//     console.log(data.length);

//     let i = 0;

//     // for each referral
//     data.forEach(e => {

//       //query for numDOS
//       dptBillingVisits.findAll({
//         where: {
//           referralId: e.referralId,
//           dos: {[Op.not]: null}
//         }
//       })
//       .then(visits1 => {
//         numDOS = visits1.length;
//         //query for numAttend
//         dptBillingVisits.findAll({
//           where: {
//             referralId: e.referralId,
//             attend: {[Op.not]: null}
//           }
//         })
//         .then(visits2 => {
//           numAttend = visits2.length;
//           console.log(i, e.referralId, numDOS, numAttend);
//           i++
//           // if (numDOS < numAttend) {
//           //   bucket[i] = {'referralId': e.referralId, 'numDOS': numDOS, 'numAttend': numAttend};
//           //   // numDOS < numAttend && console.log('referralId: ', e.referralId, ', numDOS: ', numDOS, ', numAttend: ', numAttend);
//           //   console.log(i, bucket[i]);
//           //   i++;
//           // }
//         })
//         .catch(err => {
//           console.log(err.message || "Some error occurred while retrieving numAttend.");
//         });
//       })
//       .catch(err => {
//         console.log(err.message || "Some error occurred while retrieving numDOS.");
//       });

//       // Referral.update({ptStatus: 'Follow-Up', fuHoldNotes: 'Need Upcoming appts'}, {
//       //   where: { referralId: e.referralId }
//       // })
//       //   .then(num => {
//       //   if (num == 1) {
//       //       console.log(num);
//       //   } else {
//       //       console.log(num, `Cannot update referral with id=${id}. Maybe referral was not found or req.body is empty!`);
//       //   }
//       //   })
//       //   .catch(err => {
//       //     console.log(num, `Error updating referral with id=${id}.`);
//       //   });
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