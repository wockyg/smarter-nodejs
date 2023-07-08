module.exports = app => {

  const dptBillingVisits = require("../controllers/dptBillingVisits.controller.js");

  var router = require("express").Router();

  // Create a new visit
  router.post("/", dptBillingVisits.create);

  // Retrieve a single visit with id
  router.get("/:id", dptBillingVisits.findOne);

  // Update a visit with id
  router.put("/:id", dptBillingVisits.update);

  // Delete a visit with id
  router.delete("/:id", dptBillingVisits.delete);

  // Retrieve all visits for a particular claim
  router.get("/claim/:id", dptBillingVisits.findAllVisitsForClaim);

  app.use('/api/dptBillingVisits', router);
};