module.exports = app => {

  const casemanagersView = require("../controllers/casemanagersView.controller.js");

  var router = require("express").Router();

  // Retrieve all casemanagers
  router.get("/", casemanagersView.findAll);

  // Retrieve all active casemanagers
  router.get("/active", casemanagersView.findAllActive);

  // Retrieve a single casemanager with id
  router.get("/:id", casemanagersView.findOne);

  app.use('/api/casemanagersView', router);
};