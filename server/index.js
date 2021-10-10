const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const connection = require("./DatabaseConnection/dbconnect");
const { sellerrouter } = require("./routes/seller");
const { customerrouter } = require("./routes/customerrouter");
const { locationrouter } = require("./routes/locationrouter");
var ip = "18.233.99.202";

app.use(cors({ origin: [`${ip}:3000`], credentials: true }));

app.use(express.json());

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//use connection in app;
app.use((req, res, next) => {
  req.connection = connection;
  next();
});
//Homepage
app.get("/", (req, res) => {
  res.send("Welcome to ubereats");
});
//seller route
app.use("/seller", sellerrouter);

app.use("/customer", customerrouter);

app.use("/getrestaurants", locationrouter);

app.listen(3001, () => console.log(`Server running on port 3001`));

module.exports = app;
