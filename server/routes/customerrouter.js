const express = require("express");
const {
  customersignup,
  customersignin,
  getrestaurantspecificdishes,
  customercreateorder,
  customergetorder,
  customergetaddr,
  customeraddaddr,
  customercreatedishestoorder,
  customerimageupload,
} = require("../controllers/customercontroller");
const multer = require("multer");
const upload = multer();
const { authenticate } = require("../middleware/authenticate");
const customerrouter = express.Router();

customerrouter.post("/signup", customersignup);
customerrouter.post("/signin", customersignin);
customerrouter.post("/getdishes", getrestaurantspecificdishes);
customerrouter.post("/insertorder", authenticate, customercreateorder);
customerrouter.post(
  "/ordertodishes",
  authenticate,
  customercreatedishestoorder
);
customerrouter.post("/getorders", authenticate, customergetorder);
customerrouter.post("/getaddress", authenticate, customergetaddr);
customerrouter.post("/addaddress", authenticate, customeraddaddr);
customerrouter.put(
  "/customerimage",

  upload.single("customer_image"),

  customerimageupload
);

module.exports = {
  customerrouter,
};
