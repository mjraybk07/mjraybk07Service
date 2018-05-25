const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const db = require('../database-mongodb');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('GET reqeust received');
});

// TODO REMOVE DB TEST
app.get('/test', (req, res) => {
  db.getCats((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
