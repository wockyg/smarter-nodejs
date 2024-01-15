const db = require("../models");
const Op = db.Sequelize.Op;
const { setDefaults, fromAddress, geocode, RequestType } = require("react-geocode");

setDefaults({
  key: "AIzaSyDZTDhDWFKMSUkvPEzKEVEyNCzZh0SFTw4",
  language: "en",
  region: "es",
  });


// Retrieve lat/lon from address.
exports.fromAddress = (req, res) => {

  const { searchval } = req.params;

  fromAddress(searchval)
  .then(({ results }) => {
      const { lat, lng } = results[0].geometry.location;
      // console.log("Center:", lat, lng);
      res.send({lat: lat, lon: lng});
  })
  .catch(console.error);
  
};