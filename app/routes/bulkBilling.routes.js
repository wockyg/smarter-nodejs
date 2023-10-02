module.exports = app => {

  const bulkBilling = require("../controllers/bulkBilling.controller.js");

  var router = require("express").Router();

  // Create a new bulkBilling
  router.post("/", bulkBilling.create);

  // Retrieve all bulkBilling dropdown
  router.get("/dropdown", bulkBilling.findAllDropDown);

  // Retrieve all bulkBilling searchall
  router.get("/searchall", bulkBilling.findAllSearchAll);

  // Retrieve a single bulkBilling with id
  router.get("/:id", bulkBilling.findOne);

  // Retrieve all bulkBilling
  router.get("/", bulkBilling.findAll);

  // Update an bulkBilling with id
  router.put("/:id", bulkBilling.update);

  // Delete an bulkBilling with id
  router.delete("/:id", bulkBilling.delete);

  app.use('/api/bulkBilling', router);
};