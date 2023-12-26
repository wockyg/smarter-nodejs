module.exports = app => {

  const bugReports = require("../controllers/bugReports.controller.js");

  var router = require("express").Router();

  const multer  = require('multer');
  // const upload = multer({ dest: './screenshots/' });
  const upload = multer({ dest: require.main?.path + '/screenshots/' });

  // Create a new bugReport
  router.post("/", upload.single('screenshot'), bugReports.create);

  // Retrieve all unfixed bugReports
  router.get("/unfixed", bugReports.findAllUnfixed);

  // Retrieve all bugReports submitted by given user
  router.get("/:initials", bugReports.findAllUser);

  // Retrieve all bugReports
  router.get("/", bugReports.findAll);

  // Update an bugReport with id
  router.put("/:id", bugReports.update);

  // Delete an bugReport with id
  // router.delete("/:id", user_pto.delete);

  app.use('/api/bugReports', router);
};