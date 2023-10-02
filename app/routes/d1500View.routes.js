module.exports = app => {

  const d1500View = require("../controllers/d1500View.controller.js");

  var router = require("express").Router();

  // Retrieve all d1500Rows for a particular hcfa
  router.get("/hcfa/:id", d1500View.findAllD1500ForHcfa);

  // Retrieve all d1500Rows for a particular claim
  router.get("/claim/:id", d1500View.findAllD1500ForClaim);

  // Retrieve all d1500Rows
  router.get("/", d1500View.findAll);

  app.use('/api/d1500View', router);
};