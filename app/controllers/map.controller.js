require('dotenv').config()
const db = require("../models");
const Op = db.Sequelize.Op;
const { setDefaults, fromAddress, geocode, RequestType } = require("react-geocode");
const {Client} = require("@googlemaps/google-maps-services-js");
const { response } = require('express');

setDefaults({
  key: process.env.GOOGLE_MAPS_API_KEY,
  language: "en",
  region: "es",
  });

  const client = new Client({});


// Retrieve lat/lon from address.
exports.fromAddress = (req, res) => {

  const { searchval } = req.params;

  fromAddress(searchval)
  .then(({ results }) => {
      const { lat, lng } = results[0].geometry.location;
      console.log("Center:", lat, lng);
      res.send({lat: lat, lon: lng});
  })
  .catch(console.error);
  
};

// Get directions.
exports.getDirections = (req, res) => {

  const { searchval } = req.params;

  const origin = searchval.slice(0,searchval.indexOf('x'));
  const destination = searchval.slice(searchval.indexOf('x') + 1);

  client.directions({
    params: {
      origin: origin,
      destination: destination,
      key: process.env.GOOGLE_MAPS_API_KEY,
    }
  })
  .then(response => {
    const {distance, duration} = response.data.routes[0].legs[0]
    console.log(response.data.routes[0].legs[0]);
    res.send({distance: distance.text, duration: duration.text});
  })
  .catch(console.error);
  
};