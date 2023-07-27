module.exports = app => {

  const adjustersView = require("../controllers/adjustersView.controller.js");

  var router = require("express").Router();

  // Retrieve all active adjusters
  router.get("/active", adjustersView.findAllActive);

  // Retrieve all adjusters dropdown
  router.get("/dropdown", adjustersView.findAllDropDown);

  // Retrieve all adjusters searchall
  router.get("/searchall", adjustersView.findAllSearchAll);

  // Retrieve a single adjuster with id
  router.get("/:id", adjustersView.findOne);

  // Retrieve all adjusters
  router.get("/", adjustersView.findAll);

  app.use('/api/adjustersView', router);
};