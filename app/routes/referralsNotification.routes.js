module.exports = app => {

  const referrals = require("../controllers/referralsNotification.controller.js");

  var router = require("express").Router();

  // Create a new referral
  router.post("/", referrals.create);

  // Retrieve all referrals
  router.get("/", referrals.findAll);

  // Retrieve a single referral with id
  router.get("/:id", referrals.findOne);

  // Update an referral with id
  router.put("/:id", referrals.update);

  // Delete an referral with id
  router.delete("/:id", referrals.delete);

  // Delete all referrals
  // router.delete("/", referrals.deleteAll);

  app.use('/api/referrals', router);
};