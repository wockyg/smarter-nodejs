const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  timezone: dbConfig.timezone,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.adjusters = require("./adjusters.js")(sequelize, Sequelize);
db.attorneys = require("./attorneys.js")(sequelize, Sequelize);
db.casemanagers = require("./casemanagers.js")(sequelize, Sequelize);
db.clients = require("./clients.js")(sequelize, Sequelize);
db.claimants = require("./claimants.js")(sequelize, Sequelize);
db.employers = require("./employers.js")(sequelize, Sequelize);
db.physicians = require("./physicians.js")(sequelize, Sequelize);
db.therapists = require("./therapists.js")(sequelize, Sequelize);
db.referrals = require("./referralsNotification.js")(sequelize, Sequelize);
db.referralNotes = require("./referralNotes.js")(sequelize, Sequelize);
db.dptBillingVisits = require("./dptBillingVisits.js")(sequelize, Sequelize);
db.dptAuthorization = require("./dptAuthorization.js")(sequelize, Sequelize);
db.fceppdBilling = require("./fceppdBilling.js")(sequelize, Sequelize);
db.users = require("./users.js")(sequelize, Sequelize);

db.adjustersView = require("./adjustersView.js")(sequelize, Sequelize);
db.casemanagersView = require("./casemanagersView.js")(sequelize, Sequelize);
db.claimantsView = require("./claimantsView.js")(sequelize, Sequelize);
db.referralsView = require("./referralsView.js")(sequelize, Sequelize);
db.dptBillingVisitsView = require("./dptBillingVisitsView.js")(sequelize, Sequelize);
db.fceppdBillingView = require("./fceppdBillingView.js")(sequelize, Sequelize);

// db.lookup_UsState = require("./lookup_usState.js")(sequelize, Sequelize);

module.exports = db;