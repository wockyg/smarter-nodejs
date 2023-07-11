module.exports = {
  HOST: "127.0.0.1",
  USER: "root",
  PASSWORD: "12345678",
  DB: "smarter2",
  dialect: "mysql",
  timezone: "-04:00",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};