const {
  createseller,
  fetchseller,
  createdish,
  fetchdish,
  deletedish,
  updatedish,
  fetchorders,
  fetchcustomeranddish,
  changestatus,
} = require("../models/sellermodel");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var streamifier = require("streamifier");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dgqlka0rq",
  api_key: "849791191563242",
  api_secret: "uVyl0zsdU2dw6wfrzfcpIKuA4sQ",
  secure: true,
});

const fs = require("fs");
const { promisify, callbackify } = require("util");
const { customerrouter } = require("../routes/customerrouter");
const { createBrotliCompress } = require("zlib");
const pipeline = promisify(require("stream").pipeline);
const sellersignup = async (req, res) => {
  //const { file, body } = req;
  console.log(req.file);
  var stream = streamifier.createReadStream(req.file.buffer);
  const filename = `${__dirname}/../public/images/${req.body.restaurant_name}.${
    req.file.mimetype.split("/")[1]
  }`;
  let url = "";

  await pipeline(stream, fs.WriteStream(filename));
  await cloudinary.uploader.upload(filename, function (error, result) {
    url = result.url;
  });

  bcrypt.hash(req.body.seller_password, 9).then((hash) => {
    let user = {
      ...req.body,
      seller_password: hash,
      image: url,
      pickup: req.body.pickup === "on",
      delivery: req.body.delivery === "on",
    };

    createseller(req.connection, user, (err, result) => {
      if (err) {
        res.status(500);
        res.send({ success: false });
        console.log(err);
      } else {
        res.send({ success: true, message: "Seller created succesfully" });
      }
    });
  });
};

const sellersignin = (req, res) => {
  console.log("seller controller");
  console.log(req.body);
  fetchseller(req.connection, req.body.seller_email, (err, result) => {
    if (result.length == 0) {
      res.send({ success: false, message: "Email doesnt not exist" });
    } else {
      bcrypt.compare(
        req.body.seller_password,
        result[0].seller_password,

        (err, same) => {
          if (err) res.send({ success: false, message: "Error" });
          if (same) {
            const token = jwt.sign({ ...result[0] }, "secret", {
              expiresIn: "1d",
            });
            res.send({
              success: true,
              message: "User Logged in succesfully",
              token: token,
              restaurant_id: result[0].Restaurant_id,
              email: result[0].seller_email,
            });
          } else {
            res.send({ success: false, message: "Invalid password" });
          }
        }
      );
    }
  });
};

const createsellerdishes = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  var stream = streamifier.createReadStream(req.file.buffer);
  const filename = `${__dirname}/../public/images/${req.body.restaurant_id}.${
    req.file.mimetype.split("/")[1]
  }`;
  let url = "";

  await pipeline(stream, fs.WriteStream(filename));
  await cloudinary.uploader.upload(filename, function (error, result) {
    url = result.url;
  });
  let dish = {
    restaurant_id: req.body.restaurant_id,

    dish_name: req.body.dish_name,
    dish_image: url,
    dish_description: req.body.dish_description,
    dish_price: req.body.dish_price,
  };
  createdish(req.connection, dish, (err, result) => {
    if (err) {
      res.status(500);
      res.send({ success: false });
      console.log(err);
    } else {
      res.send({ success: true, message: "Dish created succesfully" });
    }
  });
};

const getsellerdishes = (req, res) => {
  console.log(req.body);
  fetchdish(req.connection, req.body.rid, (err, result) => {
    if (result.length == 0) {
      res.send({ success: false, message: "Dishes doesnt exist" });
    } else {
      res.send({ success: true, dishes: result });
    }
  });
};
const deletesellerdish = (req, res) => {
  console.log(req.body);
  deletedish(req.connection, req.body.dish_id, (err, result) => {
    if (err) {
      res.send({ success: false, message: "Dish doesnt exist" });
    } else {
      res.send({ success: true, message: "dish deleted succesfully" });
    }
  });
};
const updatesellerdish = (req, res) => {
  updatedish(req.connection, req.body, req.body.dish_id, (err, result) => {
    if (result.length == 0) {
      res.send({ success: false, message: "Dish edited fail" });
    } else {
      res.send({ success: true, message: "dish edited succesfully" });
    }
  });
};

const sellerorders = (req, res) => {
  fetchorders(req.connection, req.body.rid, (err, orders) => {
    if (orders.length == 0) {
      res.send({ success: false, message: "Orders doesnt exist" });
    } else {
      const getDetails = (fn) => {
        let dishinfo = [];
        for (const order of orders) {
          fetchcustomeranddish(req.connection, order, (err, data) => {
            let dishes = [...JSON.parse(JSON.stringify(data[0]))];
            let customer_info = JSON.parse(JSON.stringify(data[1]));
            const status = JSON.parse(JSON.stringify(data[2]));
            dishinfo.push({
              dishes,
              customer_info,
              order_id: order.order_id,
              pickup: order.pickup,
              delivery: order.delivery,

              status,
            });

            if (dishinfo.length === orders.length) fn(dishinfo);
          });
        }
      };
      getDetails((d1) => {
        res.send({ orders: d1, success: true });
      });
    }
  });
};

const changeorderstatus = (req, res) => {
  changestatus(
    req.connection,
    req.body.order_id,
    req.body.restaurant_id,
    req.body.pickup,
    req.body.pickupReady,
    req.body.pickupSuccesful,
    req.body.delivery,
    req.body.deliveryPreparing,
    req.body.deliveryDelivered,
    (err, result) => {
      if (err) {
        res.send({ success: false, message: "Status didnot change" });
      } else {
        res.send({ success: true, message: "Status Changed" });
      }
    }
  );
};

module.exports = {
  sellersignup,
  sellersignin,
  sellerorders,
  createsellerdishes,
  getsellerdishes,
  deletesellerdish,
  updatesellerdish,
  sellerorders,
  changeorderstatus,
};
