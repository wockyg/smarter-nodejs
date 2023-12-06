module.exports = app => {

  const clients = require("../controllers/timestamps.controller.js");

  var router = require("express").Router();

  // Retrieve rrLaxtWorked
  router.get("/rrlastworked", clients.findRRLastWorked);

  // Update an rrLastWorked
  router.put("/rrlastworked", clients.updateRRLastWorked);

  app.use('/api/timestamps', router);
};