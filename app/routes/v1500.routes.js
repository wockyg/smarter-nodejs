module.exports = app => {

  const v1500 = require("../controllers/v1500.controller.js");

  var router = require("express").Router();

  const multer  = require('multer');
  // const upload = multer({ dest: './v1500_uploads/' });
  const upload = multer({ dest: require.main?.path + '/temp/' });

  // Upload a new v1500 using python/sensible
  // router.post("/upload/python/sensible", v1500.uploadPythonSensible);

  // Upload a new v1500 using smarter/sensible
  // router.post("/upload/smarter/sensible", upload.array('v1500Blobs'), v1500.uploadSmarterSensible);

  // Webhook for receiving new v1500 data using sensible
  // router.post("/webhook/sensible", v1500.webhookSensible);

  // Upload a new v1500 using python/nanonets
  router.post("/upload/python/nanonets", v1500.uploadPythonNanonets);

  // Upload a new v1500 using smarter/nannonets
  router.post("/upload/smarter/nanonets", upload.array('v1500Blobs'), v1500.uploadSmarterNanonets);

  // Webhook for receiving new v1500 data using nanonets
  router.post("/webhook/nanonets", v1500.webhookNanonets);

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