const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
  let token = req.headers.authorization;

  if (typeof token !== "undefined") {
    let finaltoken = token.split(" ")[1];
    console.log("In authentication");
    jwt.verify(finaltoken, "secret", (err, user) => {
      if (user !== null) {
        req.user = user;
        console.log("authenticated");
        next();
      } else {
        res.send({ succes: "failure", message: "NotAunthenicated" });
      }
    });
  } else {
    res.send({ succes: "failure", message: "Not Aunthenicated" });
  }
};

module.exports = { authenticate };
