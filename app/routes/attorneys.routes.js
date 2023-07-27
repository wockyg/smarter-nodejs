module.exports = app => {

  const attorneys = require("../controllers/attorneys.controller.js");

  var router = require("express").Router();

  // Create a new attorney
  router.post("/", attorneys.create);

  // Retrieve all plaintiff attorneys
  router.get("/plaintiff", attorneys.findAllPlaintiff);

  // Retrieve all defense attorneys
  router.get("/defense", attorneys.findAllDefense);

  // Retrieve all attorneys dropdown
  router.get("/dropdown", attorneys.findAllDropDown);

  // Retrieve all attorneys searchall
  router.get("/searchall", attorneys.findAllSearchAll);

  // Retrieve a single attorney with id
  router.get("/:id", attorneys.findOne);

  // Retrieve all attorneys
  router.get("/", attorneys.findAll);

  // Update an attorney with id
  router.put("/:id", attorneys.update);

  // Delete an attorney with id
  router.delete("/:id", attorneys.delete);

  // Delete all attorneys
  // router.delete("/", attorneys.deleteAll);

  app.use('/api/attorneys', router);
};