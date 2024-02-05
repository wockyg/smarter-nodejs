require('dotenv').config()
const fs = require('fs-extra');
// const { google } = require('googleapis');
const { create } = require('apisauce')

// const PDF_KEY = "wmcclure1016@gmail.com_aS4kX75jUGkH4v5kgJcismLadY2SE3mY5TwKHjc3CU2BV8uqi0332QfIN274kf5vmvRBis84pS75i5uGnPs8ym2HS3mmQA8373JnNW306m0oW4yisXD0K6134d3X16XrG09Q0kLHpT9Rqme4aqTXqrcGQV";
const PDF_KEY = process.env.PDF_KEY

// define the api
const api = create({
  baseURL: 'https://api.pdf.co/v1',
  headers: { 
    "x-api-key": PDF_KEY,
    // "Content-Type": 'application/octet-stream'
  },
})

// upload temp file
//
async function uploadTempFile(filePath) {

  return new Promise((resolve, reject) => {
    api
    .get('/file/upload/get-presigned-url')
    .then(res => {
      console.log("-------- PRESIGNED URL RETRIEVED -------------");
      // console.log(res)
      fs.readFile(filePath, (err, data) => {
          api.put(res.data.presignedUrl, data, {headers: {"Content-Type": 'application/octet-stream'}})
            .then(res2 => {
              // console.log("-------- UPLOAD COMPLETE (allegedly...) -------------");
              // console.log(res2);
              resolve(res.data.url);

            }).catch(err => reject(err));
      });
          
    }).catch(err => reject(err))
  })
  
}
exports.uploadTempFile = uploadTempFile

// Split pdf
//
async function splitPDF(url, pages, inline, name, async) {

  return new Promise((resolve, reject) => {
    
    api
      .post('/pdf/split', {
        url: url,
        pages: pages,
        inline: inline || false,
        name: name,
        async: async || false
      }, {
        headers: {"Content-Type": 'application/json'}
      })
      .then(res => {
        // console.log(res);
        resolve(res);
      })
      .catch(err => reject(err))

  })
}
exports.splitPDF = splitPDF

async function mergePDF(url, name, async) {

  return new Promise((resolve, reject) => {
    
    api
      .post('/pdf/merge', {
        url: url,
        name: name,
        async: async || false
      }, {
        headers: {"Content-Type": 'application/json'}
      })
      .then(res => {
        // console.log(res);
        resolve(res);
      })
      .catch(err => reject(err))

  })
}
exports.mergePDF = mergePDF

// Get info on pdf
//
async function getInfo(url) {

  return new Promise((resolve, reject) => {
    
    api
      .post('/pdf/info', {url: url}, {headers: {"Content-Type": 'application/json'}})
      .then(res => {
        console.log(res);
        resolve(res);
      })
      .catch(err => reject(err))

  })
}
exports.getInfo = getInfo



// BEGIN Test Functions //
//

async function uploadTempFileTest(file) {

  return new Promise((resolve, reject) => {
    api
    .get('/file/upload/get-presigned-url')
    .then(res => {
      console.log(res.data.presignedUrl)
      api.put(res.data.presignedUrl, file)
        .then(res2 => {
          console.log("-------- Temp file uploaded to PDF.co: ", file.name, " -------------");
          console.log(res2)
          resolve(res2.config.url)

        }).catch(err => reject(err));
    }).catch(err => reject(err))
  })
}
exports.uploadTempFileTest = uploadTempFileTest

async function splitPDFTest(url, pages, inline, name, async) {

  return new Promise((resolve, reject) => {

    const files = [];
    
    api
      .post('/pdf/split', {
        url: url,
        pages: pages,
        inline: inline || false,
        name: name,
        async: async || false
      })
      .then(res => {
        console.log("-??----??---- SUCCESS?? ---------??-----??--------");
        console.log("-??----??---- ????????? ---------??-----??--------");
        console.log(res);
        resolve(res);
      })
      .catch(err => reject(err))

  })
}
exports.splitPDFTest = splitPDFTest

//
// END Test Functions //