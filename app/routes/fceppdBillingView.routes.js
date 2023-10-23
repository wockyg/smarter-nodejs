module.exports = app => {

  const fceppdBillingView = require("../controllers/fceppdBillingView.controller.js");

  var router = require("express").Router();

  // Retrieve all adjusterPastDue
  router.get("/adjusterPastDue", fceppdBillingView.findAllAdjusterPastDue);

  // Retrieve all facilityPastDue
  router.get("/facilityPastDue", fceppdBillingView.findAllFacilityPastDue);

  // Retrieve a single FCE with id
  router.get("/:id", fceppdBillingView.findOne);

  app.use('/api/fceppdBillingView', router);
};