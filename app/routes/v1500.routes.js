module.exports = app => {

  const v1500 = require("../controllers/v1500.controller.js");

  var router = require("express").Router();

  const multer  = require('multer');
  // const upload = multer({ dest: './v1500_uploads/' });
  const upload = multer({ dest: require.main?.path + '/temp/' });

  // Upload a new v1500 using nanonets
  router.post("/upload/nanonets", v1500.uploadNanonets);

  // Upload a new v1500 using sensible
  router.post("/upload/sensible", v1500.uploadSensible);

  // Upload a new v1500 using smarter
  router.post("/upload/smarter", upload.array('v1500Blobs'), v1500.uploadSmarter);

  // Webhook for receiving new v1500 data using sensible
  router.post("/webhook/sensible", v1500.webhookSensible);

  // Create a new v1500
  // router.post("/", v1500.create);

  // Update an uploaded v1500 with id
  router.put("/upload/:id", v1500.updateUpload);

  // Update an v1500 with id
  router.put("/:id", v1500.update);

  // Delete an v1500 with id
  router.delete("/:id", v1500.delete);

  // Retrieve all v1500
  router.get("/", v1500.findAll);

  app.use('/api/v1500', router);
};