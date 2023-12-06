module.exports = app => {

  const therapists = require("../controllers/therapists.controller.js");

  var router = require("express").Router();

  // Create a new therapist
  router.post("/", therapists.create);

  // Retrieve all therapists searchall
  router.get("/searchall", therapists.findAllSearchAll);

  // Retrieve all therapists searchall
  router.get("/addresses", therapists.findAllAddresses);

  // Retrieve all therapists dropdown
  router.get("/dropdown", therapists.findAllDropDown);

  // Retrieve a single therapist with id
  router.get("/:id", therapists.findOne);

  // Retrieve all therapists
  router.get("/", therapists.findAll);

  // Update an therapist with id
  router.put("/:id", therapists.update);

  // Delete an therapist with id
  router.delete("/:id", therapists.delete);

  // Delete all therapists
  // router.delete("/", therapists.deleteAll);

  app.use('/api/therapists', router);
};