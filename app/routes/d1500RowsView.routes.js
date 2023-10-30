module.exports = app => {

  const d1500RowsView = require("../controllers/d1500RowsView.controller.js");

  var router = require("express").Router();

  // Retrieve all d1500Rows for a particular hcfa
  router.get("/hcfa/:id", d1500RowsView.findAllD1500RowsForHcfa);

  // Retrieve all d1500Rows for a particular claim
  router.get("/claim/:id", d1500RowsView.findAllD1500RowsForClaim);

  // Retrieve all d1500Rows not approved
  router.get("/notApproved", d1500RowsView.findAllD1500RowsNotApproved);

  // Retrieve all d1500Rows
  router.get("/", d1500RowsView.findAll);

  app.use('/api/d1500RowsView', router);
};