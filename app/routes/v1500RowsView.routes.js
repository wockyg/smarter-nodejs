module.exports = app => {

  const v1500RowsView = require("../controllers/v1500RowsView.controller.js");

  var router = require("express").Router();

  // Retrieve all v1500Rows for a particular hcfa
  router.get("/hcfa/:id", v1500RowsView.findAllV1500RowsForHcfa);

  // Retrieve all v1500Rows for a particular claim
  router.get("/claim/:id", v1500RowsView.findAllV1500RowsForClaim);

  // Retrieve all v1500Rows not approved
  router.get("/notApproved", v1500RowsView.findAllV1500RowsNotApproved);

  // Retrieve all v1500Rows
  router.get("/", v1500RowsView.findAll);

  app.use('/api/v1500RowsView', router);
};