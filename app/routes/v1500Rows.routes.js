module.exports = app => {

  const v1500Rows = require("../controllers/v1500Rows.controller.js");

  var router = require("express").Router();

  // Create a new v1500Row
  router.post("/", v1500Rows.create);

  // Retrieve all v1500Rows for a particular hcfa
  router.get("/hcfa/:id", v1500Rows.findAllV1500ForHcfa);

  // Retrieve all v1500Rows
  router.get("/", v1500Rows.findAll);

  // Update a v1500Row with id
  router.put("/:id", v1500Rows.update);

  // Delete a v1500Row with id
  router.delete("/:id", v1500Rows.delete);

  app.use('/api/v1500Rows', router);
};