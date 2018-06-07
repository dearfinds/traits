const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { getDBConn } = require('../db');

if (!process.env.SESSION_SECRET) {
  throw Error('No session secret found');
  return
}

const sessionConn = session({
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    autoReconnect: true,
    ttl: 300 * 12 * 24 * 3, // 3 days
    db: getDBConn(),
  }),
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: null,
  },
  proxy: true,
  unset: 'destroy',
  resave: false,
  saveUninitialized: false,
});

function sessionMiddleware(req, res, next) {
  sessionConn(req, res, next);
}

module.exports = {
  sessionMiddleware,
}
