module.exports = app => {

  const d1500 = require("../controllers/d1500.controller.js");

  var router = require("express").Router();

  // Create a new d1500
  router.post("/", d1500.create);

  // Retrieve all d1500
  router.get("/", d1500.findAll);

  // Update an d1500 with id
  router.put("/:id", d1500.update);

  // Delete an d1500 with id
  router.delete("/:id", d1500.delete);

  app.use('/api/d1500', router);
};