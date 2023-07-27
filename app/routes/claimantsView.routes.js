module.exports = app => {

  const claimantsView = require("../controllers/claimantsView.controller.js");

  var router = require("express").Router();

  // Retrieve all claimants dropdown
  router.get("/dropdown", claimantsView.findAllDropDown);

  // Retrieve all claimants searchall
  router.get("/searchall", claimantsView.findAllSearchAll);

  // Retrieve a single claimant with id
  router.get("/:id", claimantsView.findOne);

  // Retrieve all claimants
  router.get("/", claimantsView.findAll);

  app.use('/api/claimantsView', router);
};