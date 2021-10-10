const {
  createcustomer,
  fetchcustomer,
  getdishes,
  createorder,
  getorder,
  getrestaurantanddish,
  getaddr,
  addaddr,
  dishestoorder,
  createstatus,
  createcustomerimage,
} = require("../models/customermodel");
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
const pipeline = promisify(require("stream").pipeline);
const customersignup = (req, res) => {
  bcrypt.hash(req.body.customer_password, 9).then((hash) => {
    let user = { ...req.body, customer_password: hash };
    createcustomer(req.connection, user, (err, result) => {
      if (err) {
        res.send({ success: false });
      } else {
        res.send({ success: true, message: "Customer created succesfully" });
      }
    });
  });
};

const customersignin = (req, res) => {
  fetchcustomer(req.connection, req.body.customer_email, (err, result) => {
    if (result.length == 0) {
      res.send({ success: false, message: "Email doesnt not exist" });
    } else {
      bcrypt.compare(
        req.body.customer_password,
        result[0].customer_password,

        (err, same) => {
          if (err) res.send({ success: false, message: "Error" });
          if (same) {
            const token = jwt.sign({ ...result[0] }, "secret", {
              expiresIn: "1d",
            });
            let customer_id = result[0].customer_id;
            let customer_profile = result[0].customer_profile;
            let customer_name = result[0].customer_name;
            res.send({
              success: true,
              message: "User Logged in succesfully",
              token: token,
              customer_id,
              customer_profile,
              customer_name,
              customer_email: result[0].customer_email,
            });
          } else {
            res.send({ success: false, message: "Invalid password" });
          }
        }
      );
    }
  });
};

const getrestaurantspecificdishes = (req, res) => {
  getdishes(req.connection, req.body.restaurant_id, (err, result) => {
    if (result.length == 0) {
      res.send({ success: false, message: "Dishes doesnt not exist" });
    } else {
      res.send({ success: true, dishes: result });
    }
  });
};
const customercreateorder = (req, res) => {
  createorder(req.connection, req.body, (err, result) => {
    if (err) {
      res.send({ success: false, message: "Order was not created", err });
    } else {
      createstatus(
        req.connection,
        result.insertId,
        req.body.pickup,
        req.body.restaurant_id,
        (err, res) => {
          console.log(err);
        }
      );
      res.send({
        success: true,
        message: "Order was placed succesfully",
        order_id: result.insertId,
      });
    }
  });
};
const customergetorder = (req, res) => {
  getorder(req.connection, req.body.customer_id, (err, orders) => {
    //console.log(req.body);

    if (orders.length === 0) {
      res.send({ success: false, message: "Cannot Get Orders", err });
    } else {
      const getDetails = (fn) => {
        let dishinfo = [];

        for (const order of orders) {
          getrestaurantanddish(req.connection, order, (err, data) => {
            let dishes = [...JSON.parse(JSON.stringify(data[0]))];

            const restaurant_name = JSON.parse(JSON.stringify(data[1]));
            const status = JSON.parse(JSON.stringify(data[2]));
            dishinfo.push({
              dishes,
              restaurant_name,
              order_id: order.order_id,
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
const customergetaddr = (req, res) => {
  getaddr(req.connection, req.body.customer_id, (err, result) => {
    if (result.length == 0) {
      res.send({ success: false, message: "Address doesnot  exist" });
    } else {
      res.send({ success: true, address: result });
    }
  });
};
const customeraddaddr = (req, res) => {
  addaddr(req.connection, req.body, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ success: false, message: "Address was not added" });
    } else {
      res.send({ success: true, message: "Address added succesfully" });
    }
  });
};
const customercreatedishestoorder = (req, res) => {
  dishestoorder(req.connection, req.body, (err, result) => {
    if (err) {
      res.send({ success: false, message: "Dishes was not added" });
    } else {
      res.send({ success: true, message: "Dishes added succesfully" });
    }
  });
};
const customerimageupload = async (req, res) => {
  //const { file, body } = req;
  console.log(req.file);
  var stream = streamifier.createReadStream(req.file.buffer);
  const filename = `${__dirname}/../public/images/${req.body.customer_id}.${
    req.file.mimetype.split("/")[1]
  }`;
  let url = "";

  await pipeline(stream, fs.WriteStream(filename));
  await cloudinary.uploader.upload(filename, function (error, result) {
    url = result.url;
  });

  createcustomerimage(
    req.connection,
    url,
    req.body.customer_id,
    (err, result) => {
      if (err) {
        res.status(500);
        res.send({ success: false });
        console.log(err);
      } else {
        res.send({ success: true, message: "customer image succesfully", url });
      }
    }
  );
};

module.exports = {
  customersignup,
  customersignin,
  getrestaurantspecificdishes,
  customercreateorder,
  customergetorder,
  customergetaddr,
  customeraddaddr,
  customercreatedishestoorder,
  customerimageupload,
};
