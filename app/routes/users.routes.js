module.exports = app => {

  const users = require("../controllers/users.controller.js");

  var router = require("express").Router();

  // Create a new user
  router.post("/", users.create);

  // Retrieve a user's referral history with initials
  router.get("/history/:initials", users.getHistory);

  // Retrieve a single user with email
  router.get("/:email", users.findOne);

  // Retrieve all users
  router.get("/", users.findAll);

  // Update a user referral history with initials
  router.put("/history/:initials", users.updateHistory);

  // Update a user with initials
  router.put("/:initials", users.update);

  app.use('/api/users', router);
};