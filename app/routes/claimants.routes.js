module.exports = app => {

  const claimants = require("../controllers/claimants.controller.js");

  var router = require("express").Router();

  // Create a new claimant
  router.post("/", claimants.create);

  // Retrieve all claimants
  router.get("/", claimants.findAll);

  // Retrieve a single claimant with id
  router.get("/:id", claimants.findOne);

  // Update an claimant with id
  router.put("/:id", claimants.update);

  // Delete an claimant with id
  router.delete("/:id", claimants.delete);

  // Delete all claimants
  // router.delete("/", claimants.deleteAll);

  app.use('/api/claimants', router);
};