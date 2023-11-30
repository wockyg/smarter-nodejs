module.exports = app => {

  const user_pto = require("../controllers/user_pto.controller.js");

  var router = require("express").Router();

  // Create a new pto
  router.post("/", user_pto.create);

  // Retrieve all pto for a given user
  router.get("/:userId", user_pto.findAllUser);

  // Retrieve all pto
  router.get("/", user_pto.findAll);

  // Update a pto with id
  router.put("/:id", user_pto.update);

  // Delete a pto with id
  router.delete("/:id", user_pto.delete);

  app.use('/api/pto', router);
};