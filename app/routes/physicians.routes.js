module.exports = app => {

  const physicians = require("../controllers/physicians.controller.js");

  var router = require("express").Router();

  // Create a new physician
  router.post("/", physicians.create);

  // Retrieve all physicians dropdown
  router.get("/dropdown", physicians.findAllDropDown);

  // Retrieve all physicians searchall
  router.get("/searchall", physicians.findAllSearchAll);

  // Retrieve a single physician with id
  router.get("/:id", physicians.findOne);

  // Retrieve all physicians
  router.get("/", physicians.findAll);

  // Update an physician with id
  router.put("/:id", physicians.update);

  // Delete an physician with id
  router.delete("/:id", physicians.delete);

  // Delete all physicians
  // router.delete("/", physicians.deleteAll);

  app.use('/api/physicians', router);
};