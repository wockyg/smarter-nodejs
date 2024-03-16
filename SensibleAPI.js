require('dotenv').config()
const fs = require('fs-extra');
const { create } = require('apisauce')
import { SensibleSDK } from "sensible-api";

// define the api
const api = create({
  baseURL: 'https://api.sensible.so/v0',
})

const headers_post = {
  "accept": "application/json",
  "content-type": "application/json",
  "authorization": "Bearer " + process.env.SENSIBLE_API_KEY,
}

const headers_put = {
  "content-type": "application/pdf",
}

const headers_get = {
  "content-type": "application/json",
  "authorization": "Bearer " + process.env.SENSIBLE_API_KEY,
}

const payload = {
  "content_type": "application/pdf",
  // "webhook": {"url": "https://smarter-nodejs.onrender.com/api/v1500/webhook/sensible"}
}

// upload file
//
async function uploadV1500(filePath) {

  
  
}
exports.uploadV1500 = uploadV1500


// Get info on file
//
// async function getInfo(url) {

//   return new Promise((resolve, reject) => {
    
//     api
//       .post('/pdf/info', {url: url}, {headers: {"Content-Type": 'application/json'}})
//       .then(res => {
//         console.log(res);
//         resolve(res);
//       })
//       .catch(err => reject(err))

//   })
// }
// exports.getInfo = getInfo



// BEGIN Test Functions //
//

// async function uploadTempFileTest(file) {

//   return new Promise((resolve, reject) => {
//     api
//     .get('/file/upload/get-presigned-url')
//     .then(res => {
//       console.log(res.data.presignedUrl)
//       api.put(res.data.presignedUrl, file)
//         .then(res2 => {
//           console.log("-------- Temp file uploaded to PDF.co: ", file.name, " -------------");
//           console.log(res2)
//           resolve(res2.config.url)

//         }).catch(err => reject(err));
//     }).catch(err => reject(err))
//   })
// }
// exports.uploadTempFileTest = uploadTempFileTest

// async function splitPDFTest(url, pages, inline, name, async) {

//   return new Promise((resolve, reject) => {

//     const files = [];
    
//     api
//       .post('/pdf/split', {
//         url: url,
//         pages: pages,
//         inline: inline || false,
//         name: name,
//         async: async || false
//       })
//       .then(res => {
//         console.log("-??----??---- SUCCESS?? ---------??-----??--------");
//         console.log("-??----??---- ????????? ---------??-----??--------");
//         console.log(res);
//         resolve(res);
//       })
//       .catch(err => reject(err))

//   })
// }
// exports.splitPDFTest = splitPDFTest

//
// END Test Functions //