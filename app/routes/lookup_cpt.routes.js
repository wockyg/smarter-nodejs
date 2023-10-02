module.exports = app => {

  const lookup_cpt = require("../controllers/lookup_cpt.controller.js");

  var router = require("express").Router();

  // Retrieve a single CPT Code and rates
  router.get("/code/:code", lookup_cpt.findOne);

  // Retrieve all CPT Codes and rates for particular state
  router.get("/state/:state", lookup_cpt.findAllCodesForState);

  // Retrieve all CPT Codes w/ no rates
  router.get("/dropdown", lookup_cpt.findAllDropdownBillMachine);

  app.use('/api/lookup_cpt', router);
};