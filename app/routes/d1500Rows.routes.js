module.exports = app => {

  const d1500Rows = require("../controllers/d1500Rows.controller.js");

  var router = require("express").Router();

  // Create a new d1500Row
  router.post("/", d1500Rows.create);

  // Retrieve all d1500Rows for a particular hcfa
  router.get("/hcfa/:id", d1500Rows.findAllD1500ForHcfa);

  // Retrieve all d1500Rows
  router.get("/", d1500Rows.findAll);

  // Update a d1500Row with id
  router.put("/:id", d1500Rows.update);

  // Delete a d1500Row with id
  router.delete("/:id", d1500Rows.delete);

  app.use('/api/d1500Rows', router);
};