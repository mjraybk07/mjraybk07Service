const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const db = require('../database-mongodb');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handler for internal server errors
function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).send(err);
}

app.get('/', (req, res) => {
  res.send('GET reqeust received');
});

// TODO REMOVE DB TEST
// app.get('/test', (req, res) => {
//   db.getCats((err, results) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(results);
//     }
//   });
// });

app.post('/api/saveAccountOverview', (req, res) => {
  console.log('server post to req.body.overview to saveAccountOverview:', typeof req.body.overview )
  db.saveAccountOverview( req.body.overview, (error, result) => {
    if ( error ) {
      res.status(404).send('Invalid entry')
    } else {
      console.log('result: ', result)
      res.send(201)
    }
    
  });
})

app.get('/api/getAllAccountOverviews', (req, res) => {
  db.getAllAccountOverviews( (error, result) => {
    if ( error ) {
      res.status(404);
    } else {
      console.log('result: ', result)
      res.send(result)
    }
    
  });
})

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
