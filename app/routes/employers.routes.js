module.exports = app => {

  const employers = require("../controllers/employers.controller.js");

  var router = require("express").Router();

  // Create a new employer
  router.post("/", employers.create);

  // Retrieve a single employer with id
  router.get("/:id", employers.findOne);

  // Retrieve all employers
  router.get("/", employers.findAll);

  // Update an employer with id
  router.put("/:id", employers.update);

  // Delete an employer with id
  router.delete("/:id", employers.delete);

  // Delete all employers
  // router.delete("/", employers.deleteAll);

  app.use('/api/employers', router);
};