module.exports = app => {

  const dptBillingVisitsView = require("../controllers/dptBillingVisitsView.controller.js");

  var router = require("express").Router();

  // Retrieve all missingV1550
  router.get("/missingV1500", dptBillingVisitsView.findAllMissingV1500);

  // Retrieve all d1500NotSent
  router.get("/d1500NotSent", dptBillingVisitsView.findAllD1500NotSent);

  // Retrieve all adjusterPastDue
  router.get("/adjusterPastDue", dptBillingVisitsView.findAllAdjusterPastDue);

  // Retrieve all facilityPastDue
  router.get("/facilityPastDue", dptBillingVisitsView.findAllFacilityPastDue);

  // Retrieve all dos dropdown for BillMachine
  router.get("/dosDropdown/:id", dptBillingVisitsView.findAllDropdownBillMachine);

  // Retrieve all visits for a particular claim
  router.get("/claim/:id", dptBillingVisitsView.findAllVisitsForClaim);

   // Retrieve a single visit with id
  router.get("/:id", dptBillingVisitsView.findOne);

  app.use('/api/dptBillingVisitsView', router);
};