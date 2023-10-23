const {google} = require('googleapis');
const drive = google.drive('v3');

async function main() {
const auth = new google.auth.GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/drive',
});

// Acquire an auth client, and bind it to all future calls
const authClient = await auth.getClient();
google.options({auth: authClient});

// Do the magic
const res = await drive.files.watch({
    fileId: 'placeholder-value',
});
console.log(res.data);

// Example response
// {
//   "address": "my_address",
//   "expiration": "my_expiration",
//   "id": "my_id",
//   "kind": "my_kind",
//   "params": {},
//   "payload": false,
//   "resourceId": "my_resourceId",
//   "resourceUri": "my_resourceUri",
//   "token": "my_token",
//   "type": "my_type"
// }
}

main().catch(e => {
console.error(e);
throw e;
});