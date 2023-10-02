module.exports = app => {

  const bugReports = require("../controllers/bugReports.controller.js");

  var router = require("express").Router();

  // Create a new bugReport
  router.post("/", bugReports.create);

  // Retrieve all bugReports submitted by given user
  router.get("/:initials", bugReports.findAllUser);

  // Retrieve all users
  router.get("/", bugReports.findAll);

  // Update an user with id
  router.put("/:id", bugReports.update);

  // Delete an user with id
  // router.delete("/:id", user_pto.delete);

  app.use('/api/bugReports', router);
};