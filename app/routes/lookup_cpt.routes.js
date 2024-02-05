module.exports = app => {

  const lookup_cpt = require("../controllers/lookup_cpt.controller.js");

  var router = require("express").Router();

  // Retrieve a single CPT Code and rates
  router.get("/code/:code", lookup_cpt.findOne);

  // Retrieve all CPT Codes and rates for particular state
  router.get("/state/:state", lookup_cpt.findAllCodesForState);

  // Retrieve all CPT Codes w/ no rates
  router.get("/dropdown", lookup_cpt.findAllDropdownBillMachine);

  // Retrieve all CPT Codes and rates for all states
  router.get("/", lookup_cpt.findAllCodes);

  // Update a CPT Code
  router.put("/code/:code", lookup_cpt.updateCode);

  // Create a new CPT Code
  router.post("/", lookup_cpt.create);

  app.use('/api/lookup_cpt', router);
};