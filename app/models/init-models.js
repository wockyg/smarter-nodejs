var DataTypes = require("sequelize").DataTypes;
var _adjusters = require("./adjusters");
var _attorneys = require("./attorneys");
var _bulkBilling = require("./bulkBilling");
var _casemanagers = require("./casemanagers");
var _claimants = require("./claimants");
var _clients = require("./clients");
var _dptAuthorization = require("./dptAuthorization");
var _dptBillingVisits = require("./dptBillingVisits");
var _dptBillingVisitsNotes = require("./dptBillingVisitsNotes");
var _employers = require("./employers");
var _fceppdBilling = require("./fceppdBilling");
var _physicians = require("./physicians");
var _referralNotes = require("./referralNotes");
var _referralsNotification = require("./referralsNotification");
var _therapists = require("./therapists");

function initModels(sequelize) {
  var adjusters = _adjusters(sequelize, DataTypes);
  var attorneys = _attorneys(sequelize, DataTypes);
  var bulkBilling = _bulkBilling(sequelize, DataTypes);
  var casemanagers = _casemanagers(sequelize, DataTypes);
  var claimants = _claimants(sequelize, DataTypes);
  var clients = _clients(sequelize, DataTypes);
  var dptAuthorization = _dptAuthorization(sequelize, DataTypes);
  var dptBillingVisits = _dptBillingVisits(sequelize, DataTypes);
  var dptBillingVisitsNotes = _dptBillingVisitsNotes(sequelize, DataTypes);
  var employers = _employers(sequelize, DataTypes);
  var fceppdBilling = _fceppdBilling(sequelize, DataTypes);
  var physicians = _physicians(sequelize, DataTypes);
  var referralNotes = _referralNotes(sequelize, DataTypes);
  var referralsNotification = _referralsNotification(sequelize, DataTypes);
  var therapists = _therapists(sequelize, DataTypes);

  referralsNotification.belongsTo(adjusters, { as: "adjuster", foreignKey: "adjusterId"});
  adjusters.hasMany(referralsNotification, { as: "referralsNotifications", foreignKey: "adjusterId"});
  referralsNotification.belongsTo(attorneys, { as: "plaintiffAttorney", foreignKey: "plaintiffAttorneyId"});
  attorneys.hasMany(referralsNotification, { as: "referralsNotifications", foreignKey: "plaintiffAttorneyId"});
  referralsNotification.belongsTo(attorneys, { as: "defenseAttorney", foreignKey: "defenseAttorneyId"});
  attorneys.hasMany(referralsNotification, { as: "defenseAttorney_referralsNotifications", foreignKey: "defenseAttorneyId"});
  therapists.belongsTo(bulkBilling, { as: "bulkBilling", foreignKey: "bulkBillingId"});
  bulkBilling.hasMany(therapists, { as: "therapists", foreignKey: "bulkBillingId"});
  referralsNotification.belongsTo(casemanagers, { as: "casemanager", foreignKey: "casemanagerId"});
  casemanagers.hasMany(referralsNotification, { as: "referralsNotifications", foreignKey: "casemanagerId"});
  referralsNotification.belongsTo(casemanagers, { as: "casemanager2", foreignKey: "casemanager2Id"});
  casemanagers.hasMany(referralsNotification, { as: "casemanager2_referralsNotifications", foreignKey: "casemanager2Id"});
  referralsNotification.belongsTo(claimants, { as: "claimant", foreignKey: "claimantId"});
  claimants.hasMany(referralsNotification, { as: "referralsNotifications", foreignKey: "claimantId"});
  adjusters.belongsTo(clients, { as: "client", foreignKey: "clientId"});
  clients.hasMany(adjusters, { as: "adjusters", foreignKey: "clientId"});
  casemanagers.belongsTo(clients, { as: "client", foreignKey: "clientId"});
  clients.hasMany(casemanagers, { as: "casemanagers", foreignKey: "clientId"});
  dptBillingVisits.belongsTo(dptAuthorization, { as: "auth", foreignKey: "authId"});
  dptAuthorization.hasMany(dptBillingVisits, { as: "dptBillingVisits", foreignKey: "authId"});
  claimants.belongsTo(employers, { as: "employer", foreignKey: "employerId"});
  employers.hasMany(claimants, { as: "claimants", foreignKey: "employerId"});
  referralsNotification.belongsTo(physicians, { as: "physician", foreignKey: "physicianId"});
  physicians.hasMany(referralsNotification, { as: "referralsNotifications", foreignKey: "physicianId"});
  dptAuthorization.belongsTo(referralsNotification, { as: "referral", foreignKey: "referralId"});
  referralsNotification.hasMany(dptAuthorization, { as: "dptAuthorizations", foreignKey: "referralId"});
  fceppdBilling.belongsTo(referralsNotification, { as: "referral", foreignKey: "referralId"});
  referralsNotification.hasMany(fceppdBilling, { as: "fceppdBillings", foreignKey: "referralId"});
  referralNotes.belongsTo(referralsNotification, { as: "referral", foreignKey: "referralId"});
  referralsNotification.hasMany(referralNotes, { as: "referralNotes", foreignKey: "referralId"});
  referralsNotification.belongsTo(therapists, { as: "therapist", foreignKey: "therapistId"});
  therapists.hasMany(referralsNotification, { as: "referralsNotifications", foreignKey: "therapistId"});

  return {
    adjusters,
    attorneys,
    bulkBilling,
    casemanagers,
    claimants,
    clients,
    dptAuthorization,
    dptBillingVisits,
    dptBillingVisitsNotes,
    employers,
    fceppdBilling,
    physicians,
    referralNotes,
    referralsNotification,
    therapists,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
