const express = require("express");
const multer = require("multer");
const upload = multer();
const {
  sellersignup,
  sellersignin,
  sellerorders,
  createsellerdishes,
  getsellerdishes,
  deletesellerdish,
  updatesellerdish,
  changeorderstatus,
} = require("../controllers/sellercontroller");
const { authenticate } = require("../middleware/authenticate");
const sellerrouter = express.Router();

sellerrouter.post("/addrestaurant", upload.single("image"), sellersignup);

sellerrouter.post("/signin", sellersignin);

sellerrouter.post(
  "/createdishes",

  upload.single("dish_image"),
  authenticate,
  createsellerdishes
);
sellerrouter.post("/deletedish", authenticate, deletesellerdish);
sellerrouter.post("/orders", authenticate, sellerorders);

sellerrouter.post("/getdishes", authenticate, getsellerdishes);

sellerrouter.put("/changestatus", authenticate, changeorderstatus);

sellerrouter.put("/editdish", authenticate, updatesellerdish);
module.exports = {
  sellerrouter,
};
