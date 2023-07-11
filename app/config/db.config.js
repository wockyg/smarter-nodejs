module.exports = {
  HOST: "definedpt.com",
  PORT: "3306",
  USER: "define20_admin",
  PASSWORD: "",
  DB: "define20_smarter2",
  dialect: "mysql",
  timezone: "-04:00",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};