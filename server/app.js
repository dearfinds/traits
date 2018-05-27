const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db');
const surveyBlobModel = require('./surveyBlobModel');
const emailListModel = require('./emailListModel');
const betaAccessModel = require('./betaAccessModel');

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// app.get('/helloworld', (req, res) => res.send('Hello World!'))

app.get('/api/exists', (req, res) => {
  res.sendStatus(200);
})

app.post('/api/emailList', (req, res) => {
  emailListModel.add(req.body, (err, result) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.send();
  });
});

app.post('/api/verifyBeta', (req, res) => {
  // res.send({ email: 'sampleemail@gmail.com' });
  betaAccessModel.isValidCode(req.body.code, (err, { exists, docs }) => {
    if (err || !exists) {
      res.sendStatus(400);
      return
    }
    res.send({ email: docs.email });
  });
});

app.post('/api/survey', (req, res) => {
  console.log(`\nGOT THIS FOR SURVEY|||${JSON.stringify(req.body)}`);
  surveyBlobModel.add(req.body, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.send();
  })
});

if (process.env.NODE_ENV == 'prod') {
  app.use('/', express.static('../client/build'))
}

app.listen(8080, () => console.log(`Backend listening on port 8080!`));
