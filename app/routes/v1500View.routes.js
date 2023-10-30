module.exports = app => {

  const v1500View = require("../controllers/v1500View.controller.js");

  var router = require("express").Router();

  // Retrieve all v1500 for a particular claim
  router.get("/claim/:id", v1500View.findAllV1500ForClaim);

  // Retrieve all v1500 not approved
  router.get("/notApproved", v1500View.findAllV1500NotApproved);

  // Retrieve all v1500
  router.get("/", v1500View.findAll);

  app.use('/api/v1500View', router);
};