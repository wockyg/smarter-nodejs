module.exports = app => {

  const extraction = require("../controllers/extractions_sensible.controller.js");

  var router = require("express").Router();

  // Create a new extraction
  router.post("/", extraction.create);

  // Retrieve a single extraction with id
  router.get("/:id", extraction.findOne);

  // Retrieve all extractions
  router.get("/", extraction.findAll);

  // Update an extraction with id
  router.put("/:id", extraction.update);

  // Delete an extraction with id
  router.delete("/:id", extraction.delete);

  app.use('/api/extractions/sensible', router);
};