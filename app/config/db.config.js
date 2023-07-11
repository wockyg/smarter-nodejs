module.exports = {
  HOST: "ec2-52-41-36-82.us-west-2.compute.amazonaws.com",
  PORT: "3306",
  USER: "define20_admin",
  PASSWORD: "0SP]UY4*}]pG",
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