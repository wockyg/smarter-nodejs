module.exports = app => {

  const adjusters = require("../controllers/adjusters.controller.js");

  var router = require("express").Router();

  // Create a new adjuster
  router.post("/", adjusters.create);

  // Retrieve all active adjusters
  router.get("/active", adjusters.findAllActive);

  // Retrieve a single adjuster with id
  router.get("/:id", adjusters.findOne);

  // Retrieve all adjusters
  router.get("/", adjusters.findAll);

  // Update an adjuster with id
  router.put("/:id", adjusters.update);

  // Delete an adjuster with id
  router.delete("/:id", adjusters.delete);

  // Delete all adjusters
  // router.delete("/", adjusters.deleteAll);

  app.use('/api/adjusters', router);
};