module.exports = app => {

  const referral_icd10 = require("../controllers/referral_icd10.controller.js");

  var router = require("express").Router();

  // Create a new client
  router.post("/", referral_icd10.create);

  // Retrieve all referral_icd10
  router.get("/", referral_icd10.findAll);

  // Retrieve all referral_icd10 for specified referralId
  router.get("/:id", referral_icd10.findAllReferral);

  // Delete a referral_icd10 with id
  router.delete("/", referral_icd10.delete);

  app.use('/api/referral_icd10', router);
};