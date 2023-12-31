module.exports = app => {

  const v1500 = require("../controllers/v1500.controller.js");

  var router = require("express").Router();

  // Upload a new v1500
  router.post("/upload", v1500.upload);

  // Create a new v1500
  // router.post("/", v1500.create);

  // Retrieve all v1500
  router.get("/", v1500.findAll);

  // Update an v1500 with id
  router.put("/:id", v1500.update);

  // Delete an v1500 with id
  router.delete("/:id", v1500.delete);

  app.use('/api/v1500', router);
};