module.exports = app => {

  const dptAuthorization = require("../controllers/dptAuthorization.controller.js");

  var router = require("express").Router();

  // Create a new auth
  router.post("/", dptAuthorization.create);

  // Update an auth with id
  router.put("/:id", dptAuthorization.update);

  // Delete an auth with id
  router.delete("/:id", dptAuthorization.delete);

  // Retrieve all auths for a particular claim
  router.get("/claim/:id", dptAuthorization.findAllAuthForClaim);

  app.use('/api/dptAuthorization', router);
};