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

  // Retrieve all past appts
  router.get("/pastAppts", referralsView.findAllPastAppts);

  // Retrieve all report limbo
  router.get("/followuphold", referralsView.findAllFollowUpHold);

  // Retrieve all referral search
  router.get("/searchall", referralsView.findAllSearchAll);

  // Retrieve referrals that match search criteria
  router.get("/search", referralsView.searchReferrals);

  // Patient Records Request report
  router.get("/recordsRequest", referralsView.recordsRequest);

  // Retrieve all referrals dropdown
  router.get("/dropdown", referralsView.findAllReferralDropdown);

  // Retrieve all referrals calendar
  router.get("/calendar", referralsView.findAllReferralCalendar);

  // Retrieve all referrals open for cc dashboard
  router.get("/dashboard/open/:initials", referralsView.findAllOpenDashboard);

  // Retrieve all referrals w/ reminders for cc dashboard
  router.get("/dashboard/reminders/:initials", referralsView.findAllRemindersCC);

  // Retrieve all referrals w/ reminders for cc dashboard
  router.get("/dashboard/reminders/", referralsView.findAllReminders);

  // Retrieve all referrals w/ >14 days since last note by cc for cc dashboard
  router.get("/dashboard/14days/:initials", referralsView.findAll14DaysSinceLastNoteCC);

  // Retrieve all referrals w/ >14 days since last note all for cc dashboard
  router.get("/dashboard/14days", referralsView.findAll14DaysSinceLastNote);

  // Retrieve all FCE/PPD tomorrow for cc dashboard
  router.get("/dashboard/tomorrow/:initials", referralsView.findAllFcePpdTomorrowDashboard);

  // Retrieve all FCE/PPD next week for cc dashboard
  router.get("/dashboard/nextweek/:initials", referralsView.findAllFcePpdNextWeekDashboard);

  // Retrieve all FU/Hold for cc dashboard
  router.get("/dashboard/followuphold/:initials", referralsView.findAllFollowUpHoldDashboard);

  // Retrieve dashboard stats
  router.get("/dashboard/:initials", referralsView.findAllDashboard);

  // Retrieve all referrals tasks
  router.get("/tasks", referralsView.findAllReferralsTasks);

  // Retrieve a single referral with id
  router.get("/:id", referralsView.findOne);

  // Retrieve all referrals
  router.get("/", referralsView.findAll);

  app.use('/api/referralsView', router);
};