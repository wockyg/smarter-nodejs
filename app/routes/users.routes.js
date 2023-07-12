module.exports = app => {

  const users = require("../controllers/users.controller.js");

  var router = require("express").Router();

  // Create a new user
  router.post("/", users.create);

  // Retrieve a single user with id
  router.get("/:id", users.findOne);

  // Retrieve all user
  router.get("/", users.findAll);

  // Update an user with id
  router.put("/:id", users.update);

  // Delete an user with id
  router.delete("/:id", users.delete);

  app.use('/api/users', router);
};