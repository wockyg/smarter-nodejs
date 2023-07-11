'use strict';
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

const auto_created_model_table_name = 'adjustersview';
const view_name = "adjustersview";
const original_query = [
  "SELECT ",
  " adjusters.adjusterId, adjusters.lastName, adjusters.firstName, ",
  "CONCAT(adjusters.lastName, ', ', adjusters.firstName) AS lastFirst, ",
  " clients.client AS client, ",
  " adjusters.clientId, ",
  " adjusters.address, adjusters.suite, adjusters.city, adjusters.state, adjusters.zip, ",
  " adjusters.phone, adjusters.phoneExt, adjusters.phone2, adjusters.phone2Ext, ",
  " adjusters.fax, adjusters.email, adjusters.email2, ",
  " adjusters.fceRate, adjusters.ppdRate, adjusters.ppdDiscountRate, adjusters.phone2Ext, ",
  " adjusters.status, adjusters.dateAdded, adjusters.email2, ",
  " adjusters.ptInstructions, adjusters.fceppdInstructions, adjusters.billingInstructions ",
  " FROM adjusters ",
  " LEFT JOIN clients ",
  " ON clients.clientId = adjusters.clientId ",
].join("");

const new_query = [
  "SELECT ",
  " adjusters.adjusterId, adjusters.lastName, adjusters.firstName, ",
  "CONCAT(adjusters.lastName, ', ', adjusters.firstName) AS lastFirst, ",
  " clients.client AS client, ",
  " adjusters.clientId, ",
  " adjusters.address, adjusters.suite, adjusters.city, adjusters.state, adjusters.zip, ",
  " adjusters.phone, adjusters.phoneExt, adjusters.phone2, adjusters.phone2Ext, ",
  " adjusters.fax, adjusters.email, adjusters.email2, ",
  " adjusters.fceRate, adjusters.ppdRate, adjusters.ppdDiscountRate, adjusters.phone2Ext, ",
  " adjusters.status, adjusters.dateAdded, adjusters.email2, ",
  " adjusters.ptInstructions, adjusters.fceppdInstructions, adjusters.billingInstructions ",
  " FROM adjusters ",
  " LEFT JOIN clients ",
  " ON clients.clientId = adjusters.clientId ",
].join("");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      sequelize.query(`DROP TABLE IF EXISTS ${auto_created_model_table_name}`).then(result => {
        sequelize.query(`CREATE OR REPLACE VIEW ${view_name} AS ${new_query}`).then(result => {
          return result;
        });
      }),
    ]);
  }
};
