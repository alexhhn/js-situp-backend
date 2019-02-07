const express = require("express");
const router = express.Router();

router.use("/", (req, res, next) => {
  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log("grupper: ip " + ip);
  next();
});

router.get("/:navn", function(req, res) {
  res.send("navn " + req.params.navn);
});

module.exports = router;
