module.exports = app => {

  const casemanagersView = require("../controllers/casemanagersView.controller.js");

  var router = require("express").Router();

  // Retrieve all active casemanagers
  router.get("/active", casemanagersView.findAllActive);

  // Retrieve all casemanagers dropdown
  router.get("/dropdown", casemanagersView.findAllDropDown);

  // Retrieve all casemanagers searchall
  router.get("/searchall", casemanagersView.findAllSearchAll);

  // Retrieve a single casemanager with id
  router.get("/:id", casemanagersView.findOne);

  // Retrieve all casemanagers
  router.get("/", casemanagersView.findAll);

  app.use('/api/casemanagersView', router);
};