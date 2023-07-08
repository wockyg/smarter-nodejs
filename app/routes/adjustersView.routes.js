module.exports = app => {

  const adjustersView = require("../controllers/adjustersView.controller.js");

  var router = require("express").Router();

  // Retrieve all adjusters
  router.get("/", adjustersView.findAll);

  // Retrieve all active adjusters
  router.get("/active", adjustersView.findAllActive);

  // Retrieve a single adjuster with id
  router.get("/:id", adjustersView.findOne);

  app.use('/api/adjustersView', router);
};