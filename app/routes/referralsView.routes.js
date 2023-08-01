module.exports = app => {

  const referralsView = require("../controllers/referralsView.controller.js");

  var router = require("express").Router();

  // Retrieve all Open/Hold/Reschedule referrals
  router.get("/open", referralsView.findAllOpenHoldRescheduleCancel);

  // Retrieve all Complete/pending IA referrals
  router.get("/complete", referralsView.findAllComplete);

  // Retrieve all FCE/PPD tomorrow
  router.get("/fceppdtomorrow", referralsView.findAllFcePpdTomorrow);

  // Retrieve all FCE/PPD/IA today
  router.get("/today", referralsView.findAllApptToday);

  // Retrieve all missing report
  router.get("/missingreport", referralsView.findAllMissingReport);

  // Retrieve all report limbo
  router.get("/reportlimbo", referralsView.findAllReportLimbo);

  // Retrieve all report limbo
  router.get("/followuphold", referralsView.findAllFollowUpHold);

  // Retrieve all referral search
  router.get("/searchall", referralsView.findAllSearchAll);

  // Retrieve referrals that match search criteria
  router.get("/search", referralsView.searchReferrals);

  // Retrieve all referral dropdown
  router.get("/dropdown", referralsView.findAllReferralDropdown);

  // Retrieve a single referral with id
  router.get("/:id", referralsView.findOne);

  // Retrieve all referrals
  router.get("/", referralsView.findAll);

  app.use('/api/referralsView', router);
};