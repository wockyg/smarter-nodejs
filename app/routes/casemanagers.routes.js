module.exports = app => {

  const casemanagers = require("../controllers/casemanagers.controller.js");

  var router = require("express").Router();

  // Create a new casemanager
  router.post("/", casemanagers.create);

  // Retrieve all active casemanagers
  router.get("/active", casemanagers.findAllActive);

  // Retrieve a single casemanager with id
  router.get("/:id", casemanagers.findOne);

  // Retrieve all casemanagers
  router.get("/", casemanagers.findAll);

  // Update an casemanager with id
  router.put("/:id", casemanagers.update);

  // Delete an casemanager with id
  router.delete("/:id", casemanagers.delete);

  // Delete all casemanagers
  // router.delete("/", casemanagers.deleteAll);

  app.use('/api/casemanagers', router);
};