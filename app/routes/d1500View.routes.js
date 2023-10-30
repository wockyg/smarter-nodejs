module.exports = app => {

  const d1500View = require("../controllers/d1500View.controller.js");

  var router = require("express").Router();

  // Retrieve all d1500 for a particular claim
  router.get("/claim/:id", d1500View.findAllD1500ForClaim);

  // Retrieve all d1500 not approved
  router.get("/notApproved", d1500View.findAllD1500NotApproved);

  // Retrieve all d1500
  router.get("/", d1500View.findAll);

  app.use('/api/d1500View', router);
};