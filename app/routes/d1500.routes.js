module.exports = app => {

  const d1500 = require("../controllers/d1500.controller.js");

  var router = require("express").Router();

  const multer  = require('multer');
  // const upload = multer({ dest: './screenshots/' });
  const upload = multer({ dest: require.main?.path + '/temp/' });

  // Create a new d1500
  // router.post("/upload", d1500.upload);

  // Create a new d1500
  router.post("/", upload.single('d1500Blob'), d1500.create);

  // Retrieve all d1500
  router.get("/", d1500.findAll);

  // Update an d1500 with id
  router.put("/:id", d1500.update);

  // Delete an d1500 with id
  router.delete("/:id", d1500.delete);

  app.use('/api/d1500', router);
};