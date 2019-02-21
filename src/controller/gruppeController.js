const express = require("express");
const router = express.Router();
const client = require("../repository/db");
const errors = require("../errors/errors");

router.use("/", (req, res, next) => {
  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log("grupper: ip " + ip);
  next();
});

const asyncWrapper = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(err => {
    if (err instanceof errors.HttpError) {
      res.status(err.status).send({
        message: err.message,
        status: err.status
      });
    } else {
      console.log(err);
      res.status(500).send({
        message: "Internal server error",
        status: 500
      });
    }
  });
};

router.get(
  "/",
  asyncWrapper(async (req, res) => {
    let conneciton = await client.getConnection();
    let grupper = await conneciton.getGrupper();
    res.send(grupper);
  })
);

router.get(
  "/:name",
  asyncWrapper(async (req, res) => {
    let connection = await client.getConnection();
    let gruppe = await connection.get(req.params.name);
    res.send(gruppe);
  })
);

// Vurderer å ikke bruke parameter på post, men heller fra body?
router.post(
  "/",
  asyncWrapper(async (req, res) => {
    let conneciton = await client.getConnection();
    await conneciton.insert(req.body);
    res.send({ message: "group created" });
  })
);

router.put(
  "/:name",
  asyncWrapper(async (req, res) => {
    let connection = await client.getConnection();
    await connection.put(req.params.name, req.body);
    res.send({ message: "group updated" });
  })
);

router.delete(
  "/:name",
  asyncWrapper(async (req, res) => {
    let conneciton = await client.getConnection();
    await conneciton.delete(req.params.name);
    res.send({ message: "group deleted" });
  })
);

module.exports = router;
