const {
  fetchrestaurant,
  insertfavourites,
  fetchfavourites,
} = require("../models/restaurantmodel");
const getrestaurants = (req, res) => {
  const location = req.body.location;
  console.log(location);
  fetchrestaurant(req.connection, location, (err, result) => {
    if (result.length === 0) {
      res.send({
        success: false,
        message: "No Restaurants for above location",
      });
    } else {
      res.send({ success: true, result });
    }
  });
};

const createfavourites = (req, res) => {
  const customer_id = req.body.customer_id;
  const res_id = req.body.restaurant_id;

  insertfavourites(req.connection, customer_id, res_id, (err, result) => {
    if (err) {
      res.send({
        success: false,
        message: "Favourites  Not added",
      });
    } else {
      res.send({ success: true, message: "Favourites added" });
    }
  });
};

const getfavourites = (req, res) => {
  const customer_id = req.body.customer_id;

  fetchfavourites(req.connection, customer_id, (err, result) => {
    if (result.length == 0) {
      res.send({
        success: false,
        message: " Cannot Fetch Favourites",
      });
    } else {
      res.send({ success: true, result });
    }
  });
};

module.exports = {
  getrestaurants,
  createfavourites,
  getfavourites,
};
