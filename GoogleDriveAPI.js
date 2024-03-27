require('dotenv').config()
const fs = require('fs-extra');
const { google } = require('googleapis');

// const apikey = require('./apikey.json');

const SCOPE = ['https://www.googleapis.com/auth/drive'];



// Auth function - call before every request chain
async function authorize() {
  const jwtClient = new google.auth.JWT(
    // apikey.client_email,
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    // apikey.private_key,
    process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    SCOPE
  );
  console.log('GOOGLE_CLIENT_EMAIL: ', process.env.GOOGLE_CLIENT_EMAIL)
  await jwtClient.authorize();
  return jwtClient;
}
exports.authorize = authorize

// list files in specified GD folder
//
async function listFiles(authClient, folderId) {

  return new Promise((resolve, reject) => {

    const drive = google.drive({version: 'v3', auth: authClient});

    const files = [];
    
    drive.files.list({
      q: `'${folderId}' in parents`, 
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
      // driveId: '0AMmDAWFgfc9KUk9PVA'
    }).then(res => {
      console.log("-------- Files found: ",res.data.files.length, " -------------");
      res.data.files.forEach(f => {        
        files.push(f);
        console.log(f);
      })
      resolve(res);
    }).catch(err => reject(err))
  })
}
exports.listFiles = listFiles

// Find file by name in specified GD folder
//
async function getFileByName(authClient, folderId, fileName) {

  const filePath = `./temp/${fileName}`;
  const dest = fs.createWriteStream(filePath);

  return new Promise((resolve, reject) => {

    const drive = google.drive({version: 'v3', auth: authClient});

    const files = [];
    
    drive.files.list({
      q: `'${folderId}' in parents and name = '${fileName}'`, 
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
      // driveId: '0AMmDAWFgfc9KUk9PVA'
    }).then(res => {
      res.data.files.forEach(f => {   
          // console.log("-------- File found: ", f.name, " -------------");
          // console.log(f);
          files.push(f);
      })
      drive.files.get({
        fileId: res.data.files[0].id,
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
        alt: 'media'
      },{ responseType: 'stream' })
      .then(res2 => {
        res2.data.pipe(dest);
        resolve(filePath);
      }).catch(err => reject(err))
    }).catch(err => reject(err))
  })
}
exports.getFileByName = getFileByName

// Find file by id
//
async function getFileById(authClient, fileId) {

  const filePath = `./temp/${fileName}`;
  const dest = fs.createWriteStream(filePath);

  return new Promise((resolve, reject) => {

    const drive = google.drive({version: 'v3', auth: authClient});

    drive.files.get({
      fileId: fileId,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
      alt: 'media'
    },{ responseType: 'stream' })
    .then(res => {
      res.data.pipe(dest);
      resolve(filePath);
    }).catch(err => reject(err))

  })
}
exports.getFileById = getFileById

async function uploadFile(authClient, name, folderId, localFile) {

  return new Promise((resolve, reject) => {

    const drive = google.drive({version: 'v3', auth: authClient});

    const fileMetaData = {
      name: name,
      parents: [folderId]
    }

    drive.files.create({
      resource: fileMetaData,
      media: {
        body: fs.createReadStream(localFile)
      },
      fields: 'id',
      supportsAllDrives: true
    }, function(err, file){
      if (err) {
        console.log('FAIL....')
        return reject(err);
      }
      console.log('SUCCESS!!')
      resolve(file)
    })
  })
}
exports.uploadFile = uploadFile

async function moveFile(authClient, fileId, source_folderId, target_folderId) {

  console.log("Moving File........")

  return new Promise((resolve, reject) => {

    const drive = google.drive({version: 'v3', auth: authClient});

    drive.files.update({
      fileId: fileId,
      supportsAllDrives: true,
      addParents: target_folderId,
      removeParents: source_folderId
    })
    .then(res2 => {
      console.log("File moved...");
      console.log(res2);
      resolve(res2);
    })
    .catch(err => reject(err))
  })
}
exports.moveFile = moveFile

async function moveAndRenameFile(authClient, oldFileName, newFileName, source_folderId, target_folderId) {

  console.log("Moving File........")

  return new Promise((resolve, reject) => {

    const drive = google.drive({version: 'v3', auth: authClient});

    drive.files.list({
      q: `'${source_folderId}' in parents and name = '${oldFileName}'`, 
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
      // driveId: '0AMmDAWFgfc9KUk9PVA'
    }).then(res => {
    
      drive.files.update({
        fileId: res.data.files[0].id,
        supportsAllDrives: true,
        addParents: target_folderId,
        removeParents: source_folderId,
        resource: {'name': newFileName}
      })
      .then(res2 => {
        console.log("File moved and renamed...");
        console.log(res2);
        resolve(res2);
      })
      .catch(err => reject(err))
    
    })
    .catch(err => reject(err))

  })
}
exports.moveAndRenameFile = moveAndRenameFile


// BEGIN Test Functions //
//

async function uploadFileTest(authClient) {

  return new Promise((resolve, reject) => {

    const drive = google.drive({version: 'v3', auth: authClient});

    const fileMetaData = {
      name: "test123Boom",
      parents: ["1B7Wt6fl5Gevvray3hu9k0s5S9rHwbFgy"]
    }

    drive.files.create({
      resource: fileMetaData,
      media: {
        body: fs.createReadStream('./winnerWinner.txt')
      },
      fields: 'id',
      supportsAllDrives: true
    }, function(err, file){
      if (err) {
        console.log('FAIL....')
        return reject(err);
      }
      console.log('SUCCESS!!')
      resolve(file)
    })
  })
}
exports.uploadFileTest = uploadFileTest

async function searchFolderTest(authClient) {

  const folderId = '1B7Wt6fl5Gevvray3hu9k0s5S9rHwbFgy'; // !Smarter folder in SharedDrive 1DcQT9tx8ktXBG0a-mVF9yW4yEQnvCn2t
  const folderId_inbound = '17TgrR79PGv6I5AnwYJU-M9hfkkqWxwa4'; // BillMachineIn folder in SharedDrive
  const folderId2 = '11Nu8UkSSSBzSdNjmtWe67roaGcnwt_95'; //folder in MyDrive
  const folderId_root = '0AMmDAWFgfc9KUk9PVA'; //SharedDrive root folder

  return new Promise((resolve, reject) => {

    const drive = google.drive({version: 'v3', auth: authClient});

    const files = [];

    drive.files.list({
      q: `'${folderId_inbound}' in parents`, 
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
      // alt: 'media'
      // driveId: '0AMmDAWFgfc9KUk9PVA'
    }).then(res => {
      console.log(res)
      res.data.files.forEach(f => {
        console.log("okayyyyyyyyyy")
        files.push(f);
      })
      files.map(f => console.log(f))
      resolve(res);
    }).catch(err => reject(err))
  })
}
exports.searchFolderTest = searchFolderTest

async function getFileTest(authClient) {

  return new Promise((resolve, reject) => {

    const drive = google.drive({version: 'v3', auth: authClient});

    const file1 = '19z-DvqpOoQM--la1KVWJeofhARyeN47Y'; // Edwards, Keasia DOS 08-26-2022.pdf

    drive.files.get({
      fileId: file1,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
      alt: 'media'
      // driveId: '0AMmDAWFgfc9KUk9PVA'
    },{ responseType: 'stream' }).then(res => {
      console.log("okayyyyyyyyyy");
      console.log(res);
      resolve(res);
    }).catch(err => reject(err))
  })
}
exports.getFileTest = getFileTest

async function moveFileTest(authClient) {

  const source_folderId = '17TgrR79PGv6I5AnwYJU-M9hfkkqWxwa4'; // BillMachineIn folder in SharedDrive
  const target_folderId = '17KdAnx0g6ADf8RqkpJtRJtsQibk1l8_z'; // BillMachineOut folder in SharedDrive 17TgrR79PGv6I5AnwYJU-M9hfkkqWxwa4

  return new Promise((resolve, reject) => {

    const drive = google.drive({version: 'v3', auth: authClient});

    drive.files.list({
      q: `'${source_folderId}' in parents and mimeType != 'application/vnd.google-apps.folder'`, 
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
      // driveId: '0AMmDAWFgfc9KUk9PVA'
    }).then(res => {

      res.data.files.map(f => console.log(f));
      console.log("0 id:", res.data.files[0].id)
      console.log(res);

      // resolve(res);

      console.log("................")
      console.log("................")
      console.log("................")
      console.log("Moving File........")
      console.log("................")
      console.log("................")
      console.log("................")

      drive.files.update({
        fileId: res.data.files[0].id,
        supportsAllDrives: true,
        addParents: target_folderId,
        removeParents: source_folderId
      })
      .then(res2 => {
        console.log("yippee!!");
        console.log(res2);
        resolve(res2);
      })
      .catch(err => reject(err))

    }).catch(err => reject(err))
  })
}
exports.moveFileTest = moveFileTest

//
// END Test Functions //