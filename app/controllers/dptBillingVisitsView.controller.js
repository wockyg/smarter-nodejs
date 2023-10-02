const db = require("../models");
const VisitView = db.dptBillingVisitsView;
const Op = db.Sequelize.Op;


// Find a single visit with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    VisitView.findByPk(id)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find visit with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving visit with id=" + id
        });
        });
  
};

// Find all visits for a particular claim
exports.findAllVisitsForClaim = (req, res) => {
    VisitView.findAll({ where: { referralId: req.params.id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving visits for claim."
      });
    });
};

// Find all missingV1500
exports.findAllMissingV1500 = (req, res) => {
        VisitView.findAll({
      where: {
          attend: 'Yes',
          v1500: null,
          writeOff: null
      } 
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving missingV1500."
      });
    });
};

// Find all D1500NotSent
exports.findAllD1500NotSent = (req, res) => {
    VisitView.findAll({
      where: {
        v1500: {
          [Op.ne]: null
        },
        d1500Sent: null
      } 
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving d1500NotSent."
      });
    });
};

// Find all adjusterPastDue
exports.findAllAdjusterPastDue = (req, res) => {
    const d = new Date();
    d.setDate(d.getDate() - 45);
    VisitView.findAll({
      where: {
        adjusterDatePaid: null,
        attend: 'Yes',
        d1500Sent: {
          [Op.not]: null,
          [Op.lt]: d
        }
      } 
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving adjusterPastDue."
      });
    });
};

// Find all facilityPastDue
exports.findAllFacilityPastDue = (req, res) => {
    const d = new Date();
    d.setDate(d.getDate() - 45);
    VisitView.findAll({
      where: {
        facilityDatePaid: null,
        attend: 'Yes',
        dos: {
          [Op.not]: null,
          [Op.lt]: d
        }
      } 
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving facilityPastDue."
      });
    });
};

// Find all dosDropdown for BillMachine
exports.findAllDropdownBillMachine = (req, res) => {
    VisitView.findAll({
      attributes: [
          'billingId', 
          'referralId',
          'dos',
          'attend',
          'v1500',
          'd1500Sent',
          'd1500Generated',
          'hcfaId'
      ],
      where: {
        referralId: req.params.id,
        attend: 'Yes',
        v1500: {
          [Op.not]: null
        },
        // d1500Sent: {
        //   [Op.not]: null,
        //   [Op.lt]: d
        // },
      },
      order: [['dos', 'ASC']]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving dosDropdown."
      });
    });
};