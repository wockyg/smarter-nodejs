const db = require("../models");
const Claimant = db.claimants;
const Op = db.Sequelize.Op;
const { setDefaults, fromAddress, geocode, RequestType } = require("react-geocode");

  setDefaults({
    key: "AIzaSyDZTDhDWFKMSUkvPEzKEVEyNCzZh0SFTw4",
    language: "en",
    region: "es",
    });


// Create and Save a new claimant
exports.create = (req, res) => {

  fromAddress(`${req.body.address || ''}, ${req.body.city || ''}, ${req.body.state || ''} ${req.body.zip || ''}`)
  .then(({ results }) => {

        const { lat, lng } = results[0].geometry.location;
        console.log("new therapist coordinates:", lat, lng);
        
        // Create new claimant
        const claimant = {
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            employerId: req.body.employerId || null,
            gender: req.body.gender || null,
            birthDate: req.body.birthDate || null,
            injuryDate1: req.body.injuryDate1 || null,
            injuryDate2: req.body.injuryDate2 || null,
            address: req.body.address || null,
            city: req.body.city || null,
            state: req.body.state || null,
            zip: req.body.zip || null,
            lat: lat || null,
            lon: lng || null,
            phone: req.body.phone || null,
            alternatePhone: req.body.alternatePhone || null,
            email: req.body.email || null,
            email2: req.body.email2 || null,
            notes: req.body.notes || null
        };

        // Save claimant in the database
        Claimant.create(claimant)
            .then(data => {
                // TODO crete folder in Patient Directory
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the claimant."
                });
            });
    })
  
};

// Update an claimant by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    if (req.body.address || req.body.city || req.body.state || req.body.zip) {
        const newAddress = `${req.body.address || ''}, ${req.body.city || ''}, ${req.body.state || ''} ${req.body.zip || ''}`
        fromAddress(newAddress)
        .then(({ results }) => {
            const { lat, lng } = results[0].geometry.location;
            console.log("new coordinates:", lat, lng);
            console.log("new address:", newAddress);
            Claimant.update({...req.body, lat: lat, lon: lng}, {where: { claimantId: id }})
            .then(num => {
                res.send({
                message: `${num} rows updated w/ latlon`
                });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while updating the claimant."
                });
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while geocoding the new address."
            });
        });
    }
    else {
        // just update regular
        Claimant.update(req.body, {
            where: { claimantId: id }
        })
            .then(num => {
                res.send({
                message: `${num} rows updated regular`
                });
            })
            .catch(err => {
            res.status(500).send({
                message: "Error updating claimant with id=" + id
            });
            });
    }
};

// Retrieve all claimants from the database.
exports.findAll = (req, res) => {
    // const lastName = req.query.lastName;
    // var condition = lastName ? { lastName: { [Op.like]: `%${lastName}%` } } : null;

    Claimant.findAll()
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving claimants."
        });
        });
  
};

// Find a single claimant with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Claimant.findByPk(id)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find claimant with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving claimant with id=" + id
        });
        });
  
};

// Delete an claimant with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Claimant.destroy({
        where: { claimantId: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "claimant was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete claimant with id=${id}. Maybe claimant was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error deleting claimant with id=" + id
        });
        });
};

// Delete all claimants from the database.
exports.deleteAll = (req, res) => {
    Claimant.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} claimants were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all claimants."
      });
    });  
};