module.exports = app => {

  const fceppdBillingView = require("../controllers/fceppdBillingView.controller.js");

  var router = require("express").Router();

  // Retrieve a single FCE with id
  router.get("/:id", fceppdBillingView.findOne);

  app.use('/api/fceppdBillingView', router);
};