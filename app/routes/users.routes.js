module.exports = app => {

  const users = require("../controllers/users.controller.js");

  var router = require("express").Router();

  // Create a new client
  router.post("/", users.create);

  // Retrieve all clients
  router.get("/", users.findAll);

  // Retrieve a single client with id
  router.get("/:id", users.findOne);

  // Update an client with id
  router.put("/:id", users.update);

  // Delete an client with id
  router.delete("/:id", users.delete);

  app.use('/api/users', router);
};