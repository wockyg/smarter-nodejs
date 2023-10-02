module.exports = app => {

  const users = require("../controllers/users.controller.js");

  var router = require("express").Router();

  // Create a new user
  router.post("/", users.create);

  // Retrieve a single user with email
  router.get("/:email", users.findOne);

  // Retrieve all users
  router.get("/", users.findAll);

  // Update an user with initials
  router.put("/:initials", users.update);

  // Delete an user with id
  // router.delete("/:id", users.delete);

  app.use('/api/users', router);
};