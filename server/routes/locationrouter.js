const {
  getrestaurants,
  createfavourites,
  getfavourites,
} = require("../controllers/locationcontroller");

const express = require("express");
const locationrouter = express.Router();

locationrouter.post("/", getrestaurants);

locationrouter.post("/addtofavourites", createfavourites);
locationrouter.post("/getfavourites", getfavourites);
module.exports = {
  locationrouter,
};
