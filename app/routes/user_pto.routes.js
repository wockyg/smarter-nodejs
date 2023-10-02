module.exports = app => {

  const user_pto = require("../controllers/user_pto.controller.js");

  var router = require("express").Router();

  // Create a new user
  router.post("/", user_pto.create);

  // Retrieve a single user with id
  router.get("/:userId", user_pto.findAllUser);

  // Retrieve all users
  router.get("/", user_pto.findAll);

  // Update an user with id
  // router.put("/:initials", user_pto.update);

  // Delete an user with id
  // router.delete("/:id", user_pto.delete);

  app.use('/api/pto', router);
};