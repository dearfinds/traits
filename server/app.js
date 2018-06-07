const async = require('async');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { sessionMiddleware } = require('./middlewares/sessionMiddleware');
const { authMiddleware } = require('./middlewares/authMiddleware');
const { loginRedirectMiddleware } = require('./middlewares/loginRedirectMiddleware');
const surveyBlobModel = require('./surveyBlobModel');
const emailListModel = require('./emailListModel');
const betaAccessModel = require('./betaAccessModel');
const userModel = require('./models/userModel');
const requestUtils = require('./utils/requestUtils');
// const INVALID_COMBINATION = "Invalid username/password.";

function create() {
  const app = express();

  app.use(bodyParser.json());
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  // app.engine('html', require('ejs').renderFile);
  // app.set('view engine', 'html');
  app.use(sessionMiddleware);
  // app.get('/helloworld', (req, res) => res.send('Hello World!'))

  app.get('/api/exists', (req, res) => {
    console.log(`\nReqSession||${JSON.stringify(req.session)}`);
    // if (!res.session.views) res.session.views = { apiexists: 1 };
    // else res.session.views.apiexists += 1
    res.sendStatus(200);
    // res.redirect('/');
  });

  app.use((req, res, next) => {
    console.log(`\nSessionLogin|${JSON.stringify(req.session)}`);
    next();
  })

  app.post('/api/logout', authMiddleware, (req, res) => {
    requestUtils.removeLoginSessionDetails(req, (err, result) => {
      // no err handling here for now
      console.log(`\nLogout removed!`);
      res.redirect('/login');
    });
  });

  app.post('/api/login', (req, res) => {
    // console.log(`\nLoginDetails||${JSON.stringify(req.body)}`);
    const { email, password } = req.body;
    if (!email || !password) return res.sendStatus(400);

    async.waterfall([
      cb => userModel.matchPassword(email, password, cb),
      ({ matched, userId }, cb) => {
        console.log(`\nReturnedVal|${matched}|${userId}`);
        if (!matched) return cb(new Error('No user matched'));
        requestUtils.addLoginSessionDetails(req, userId, cb);
      },
    ], (err, result) => {
      if (err) {
        if (err.message === 'No user matched') {
          return res.sendStatus(400);
        }
        // Could not save session.
        return res.sendStatus(500);
      }
      console.log(`\nLogging you in - all good.`);
      return res.redirect('/');
    });
  });

  app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.sendStatus(400);
    async.waterfall([
      cb => userModel.createUser(email, password, cb),
      (userId, cb) => requestUtils.addLoginSessionDetails(req, userId, cb),
    ], (err, result) => {
      if (err) {
        if (err.message === userModel.USER_EXISTS) {
          return res.status(400).send({ error: userModel.USER_EXISTS });
        }

        return res.sendStatus(500);
      }
      console.log(`\nRegistering you in - all good.`);
      res.redirect('/')
    });
  });

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

  app.post('/api/survey',
  authMiddleware,
  (req, res) => {
    console.log(`\nGOT THIS FOR SURVEY|||${JSON.stringify(req.body)}`);
    surveyBlobModel.add(req.body, req.session.login.userId, (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      }
      res.send();
    })
  });

  // when going to `/app2`, serve the files at app2/build/* as static files
  // app.use('/login', express.static(path.join(__dirname, '../login/build')))
  // when going to `/`, serve the files at mainApp/build/* as static files
  app.use('/login', loginRedirectMiddleware, express.static(path.join(__dirname, '../login/build')));

  // These are necessary for routing within react
  app.get('/login/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../login/build/index.html'))
  });

  app.use('/', authMiddleware, express.static(path.join(__dirname, '../client/build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });




  // app.use('/asdf/*', express.static('../login/asdf'));

  // if (process.env.NODE_ENV == 'prod') {
  // app.use('/', (req, res, next) => {
  //   console.log(`\nComingINTO /#`); next();
  // }, express.static('../client/build'));

  // app.get('/', (req, res, next) => {
  //   console.log(`\nComingINTO /#`); next();
  // }, authMiddleware, express.static('../client/build'));

  // app.use('/', (req, res, next) => {
    // console.log(`\nComingINTO just /`);
    // const absPath = path.join(__dirname, '../login/build/index.html');
    // console.log(`\nAbsPath|${absPath}`);
    // res.render(absPath);
    // next();
  // }, loginRedirectMiddleware, express.static('../login/build'));
  // app.use(express.static('../client/build'));

  // app.use('/', express.static(__dirname + '../login/build'));
  // app.use('/static', express.static(__dirname + '../login/build/static'));

  // let path = "";
  // app.use('/', (req, res, next) => {
  //   const noLoginToken = !req.session.login || !req.session.login.userId;
  //   // res.locals = { client: noLoginToken ? '../login/build' : '../client/build' };
  //   path = noLoginToken ? '../login/build' : '../client/build';
  // }, express.static(__dirname + path));

  // app.get('/', (req, res) =>
  //   res.sendFile('./index.html', { root: path.join(__dirname, '../login/build') }));
  // app.get('/login', (req, res) => res.render(path.join(__dirname, '../login/build/index.html')));
  // app.get('/', (req, res) => res.render(path.join(__dirname, '../client/build/index.html')));

  // app.use(express.static('../login/build'));

  return app;
}

module.exports = {
  create,
}
