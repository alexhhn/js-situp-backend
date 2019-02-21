const express = require("express");
var cors = require("cors");
const app = express();
const grupper = require("./src/controller/gruppeController");
const bodyParser = require("body-parser");

app.use(cors({ origin: "http://localhost:8080" }));
app.use(bodyParser.json());

const port = 3000;

app.use("/gruppe", grupper);
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
