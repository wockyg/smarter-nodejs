module.exports = app => {

  const featureRequests = require("../controllers/featureRequests.controller.js");

  var router = require("express").Router();

  const multer  = require('multer');
  const upload = multer({ dest: './screenshots/' });

  // Create a new featureRequest
  router.post("/", upload.single('screenshot'), featureRequests.create);

  // Retrieve all featureRequests submitted by given user
  router.get("/:initials", featureRequests.findAllUser);

  // Retrieve all featureRequests
  router.get("/", featureRequests.findAll);

  // Update a featureRequest with id
  router.put("/:id", featureRequests.update);

  // Delete an user with id
  // router.delete("/:id", user_pto.delete);

  app.use('/api/featureRequests', router);
};