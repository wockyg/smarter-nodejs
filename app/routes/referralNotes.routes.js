module.exports = app => {

  const referralNotes = require("../controllers/referralNotes.controller.js");

  var router = require("express").Router();

  // Create a new adjuster
  router.post("/", referralNotes.create);

  // Retrieve all notes for a referralId
  router.get("/:id", referralNotes.findReferralNotes);

  // Delete a note with id
  router.delete("/:id", referralNotes.delete);

  app.use('/api/referralNotes', router);
};