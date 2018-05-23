const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db');
const surveyBlobModel = require('./surveyBlobModel');
console.log(`\nSurveyBlobModel||${JSON.stringify(surveyBlobModel)}`)
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/api/survey', (req, res) => {
  console.log(`\nGOT THIS FOR SURVEY|||${JSON.stringify(req.body)}`);
  surveyBlobModel.add(req.body, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(402);
    }
    res.send();
  })
});

app.listen(8080, () => console.log(`Backend listening on port 8080!`));
