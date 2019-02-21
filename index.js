const express = require('express');
var cors = require('cors');
const app = express();
const grupper = require('./src/controller/gruppeController');
const bodyParser = require('body-parser');

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

const port = 3000;

app.use('/gruppe', grupper);
app.get('/', (req, res) => res.send('Hello World!'));

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
