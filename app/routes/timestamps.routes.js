module.exports = app => {

  const timestamps = require("../controllers/timestamps.controller.js");

  var router = require("express").Router();

  // Retrieve ascending
  router.get("/ascending", timestamps.findAscending);

  // Retrieve rrLaxtWorked
  router.get("/rrlastworked", timestamps.findRRLastWorked);

  // Update an rrLastWorked
  router.put("/rrlastworked", timestamps.updateRRLastWorked);

  app.use('/api/timestamps', router);
};