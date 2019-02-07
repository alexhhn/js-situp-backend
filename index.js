const express = require("express");
const app = express();
const grupper = require("./src/gruppe");
const port = 3000;

app.use("/gruppe", grupper);
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
