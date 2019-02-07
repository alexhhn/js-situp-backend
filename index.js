const express = require("express");
const app = express();
const grupper = require("./src/grupper");
const port = 3000;

app.use("/grupper", grupper);
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
