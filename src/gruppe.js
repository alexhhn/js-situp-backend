const express = require("express");
const router = express.Router();

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/situp";

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

router.use("/", (req, res, next) => {
  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log("grupper: ip " + ip);
  next();
});

router.get("/:navn", (req, res) => {
  res.send("get: navn " + req.params.navn);
});

router.post("/:navn", (req, res) => {
  res.send("post: navn " + req.params.navn);
});

router.patch("/:navn", (req, res) => {
  res.send("patch: navn " + req.params.navn);
});

router.delete("/:navn", (req, res) => {
  res.send("delete: navn " + req.params.navn);
});

module.exports = router;
