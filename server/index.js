const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//const db = require('../database-mongodb');
const db = require('../database-mysql/database').bookshelf;


const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handler for internal server errors
function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).send(err);
}

app.get('/status', (req, res) => {
  const localTime = (new Date()).toLocaleTimeString();
  
  res.
  status(200).
  send(`Server time is ${localTime}`)
  
});





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
      res.status(404).send('Invalid entry');
    } else {
      console.log('result: ', result)
      res.send(result)
    }
    
  });
})


app.get('/api/getAllAccountIds', (req, res) => {
  db.getAllAccountIds( (error, result) => {
    if ( error ) {
      res.status(404).send('Invalid entry');
    } else {
      console.log('account ids: ', result)
      res.send(result);
    }
  })
})


app.get('/api/getAccountById', (req, res) => {
  let accountId = req.headers.accountid;
  console.log('this is the account id', accountId)
  
  db.getAccountById(accountId, (error, result) => {
    if ( error ) {
      res.status(404).send(error);
    } else {
      res.json(result)
    }
  })
  
})



app.get('/api/getCasesByAccountId', (req, res) => {
  let accountId = req.headers.accountid;
  console.log(accountId)
  
  db.getCasesByAccountId(accountId, (error, result) => {
    if ( error ) {
      res.status(404).send(error);
    } else {
      res.json(result)
    }
  })  
})

app.get('/api/getUsersByAccountId', (req, res) => {
  let accountId = req.headers.accountid;
  console.log('account id: ', accountId);
  
  db.getUsersByAccountId(accountId, (error, result) => {
    if ( error ) {
      res.status(404).send(error);
    } else {
      res.json(result)
    }
  })
})

app.get('/api/getMessagesByAccountId', (req, res) => {
  let accountId = req.headers.accountid;
  console.log('account id: ', accountId);
  
  db.getMessagesByAccountId(accountId, (error, result) => {
    if ( error ) {
      res.status(404).send(error);
    } else {
      res.json(result);
    }
  }) 
})



app.get('/api/getAccountOverviewById', (req, res) => {
  let accountId = req.headers.accountid;
  console.log(`Getting account overview for account id ${accountId}`)
  
  db.getAccountOverviewById( accountId, (error, result) => {
    if ( error ) {
      res.status(404).send(error);
    } else {
      res.json(result);
    }
  })
  
})



app.get('*', (req, res) => {
  res.sendStatus(404);
})


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
