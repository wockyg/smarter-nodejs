require('dotenv').config()
const fs = require('fs-extra');
const { create } = require('apisauce')
const FormData = require('form-data');

// define the api
const api = create({
  baseURL: 'https://app.nanonets.com/api/v2',
})

// upload file
async function uploadV1500(filePath) {

    const headers_post = {
        headers: {
            'Authorization' : 'Basic ' + Buffer.from('Ondb64mRw4nldyklddZTf3Ko-iD2wDUD' + ':').toString('base64'),
            // 'Accept': 'multipart/form-data',
            'Content-Type': 'multipart/form-data'
        }
    }

    const data = new FormData();
    data.append('file', fs.createReadStream(filePath));

    return new Promise((resolve, reject) => {

        api
        .post(`/OCR/Model/${process.env.NANONETS_MODEL_ID}/LabelFile/?async=true`, data, headers_post)
        .then(res => {
            // console.warn("------------RESPONSE BELOW---------------")
            // console.log(res);
            resolve(res);
        })
        .catch(err => reject(err))
    })

        
  
}
exports.uploadV1500 = uploadV1500




// BEGIN Test Functions //
//



//
// END Test Functions //