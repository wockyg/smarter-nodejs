const db = require("../models");
const ReferralNote = db.referralNotes;
const Op = db.Sequelize.Op;


// Create and Save a new note
exports.create = (req, res) => {
     // Validate request
  // if (!req.body.lastName) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create new note
  const referralNote = {
    referralId: req.body.referralId,
    initials: req.body.initials,
    flag: req.body.flag,
    note: req.body.note
  };

  // Save note in the database
  ReferralNote.create(referralNote)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the note."
      });
    });

  
};

// Delete a note with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    ReferralNote.destroy({
        where: { noteId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "note was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete note with id=${id}. Maybe note was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error deleting note with id=" + id
        });
        });
};

// Find all notes for a referralId
exports.findReferralNotes = (req, res) => {
    const id = req.params.id
    ReferralNote.findAll({ where: { referralId: id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving referral notes."
      });
    });
};