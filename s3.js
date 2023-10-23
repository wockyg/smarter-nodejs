require('dotenv').config()
const fs = require('fs-extra')
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");


const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secetAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3Client({region: region})

// const s3 = new S3Client({
//   region: region,
//   credentials: {
//     "accessKeyId": accessKeyId, 
//     "secretAccessKey": secetAccessKey, 
//     "region": region
//   }
// })

async function uploadFile(file) {
    
    const fileStream = fs.createReadStream(file.path)

    const params = {
        Bucket: bucketName,
        Key: file.filename,
        Body: fileStream,
    }

  const result = await s3.send(
    new PutObjectCommand(params)
  );

  return result
}
exports.uploadFile = uploadFile

async function downloadFile(fileKey) {

    const params = {
        Bucket: bucketName,
        Key: fileKey,
    }

  const result = await s3.send(
    new GetObjectCommand(params)
  );

  return result
}
exports.downloadFile = downloadFile