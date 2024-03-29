require('dotenv').config()

module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  dialect: "mysql",
  timezone: "-00:00",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};