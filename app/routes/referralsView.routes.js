module.exports = app => {

  const referralsView = require("../controllers/referralsView.controller.js");

  var router = require("express").Router();

  // Retrieve all referrals
  router.get("/", referralsView.findAll);

  // Retrieve all open referrals
  router.get("/open", referralsView.findAllOpen);

  // Retrieve a single referral with id
  router.get("/:id", referralsView.findOne);

  app.use('/api/referralsView', router);
};