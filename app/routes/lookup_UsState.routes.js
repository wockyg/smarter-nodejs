module.exports = app => {

  const states = require("../controllers/lookup_UsState.controller.js");

  var router = require("express").Router();

  // Retrieve all US states
  router.get("/", states.findAll);

  // Retrieve a single US state with id
  router.get("/:id", states.findOne);

  // Update a US state with id
  router.put("/:id", states.update);

  app.use('/api/states', router);
};