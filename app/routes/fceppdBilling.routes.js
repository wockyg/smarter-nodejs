module.exports = app => {

  const fceppdBilling = require("../controllers/fceppdBilling.controller.js");

  var router = require("express").Router();

  // Retrieve a single visit with id
  router.get("/:id", fceppdBilling.findOne);

  // Update a visit with id
  router.put("/:id", fceppdBilling.update);

  // Delete a visit with id
  router.delete("/:id", fceppdBilling.delete);

  app.use('/api/fceppdBilling', router);
};