module.exports = app => {

  const map = require("../controllers/map.controller.js");

  var router = require("express").Router();
  

  // Retrieve lat/lon from address
  router.get("/fromAddress/:searchval", map.fromAddress);

  // Retrieve directions
  router.get("/directions/:searchval", map.getDirections);

  app.use('/api/map', router);
};