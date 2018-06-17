const async = require('async');
const _ = require('lodash');
const userModel = require('../models/userModel');
const LOGIN_NOW = 'Please login';

function authMiddleware(req, res, next) {
  if (process.env.NODE_ENV !== 'prod') {
    next();
  }
  // console.trace();
  // console.log(`\nCheckingInAuthMID|${JSON.stringify(req.session)}`);
  if (!req.session.login || !req.session.login.userId)
    return res.redirect('/login/');
  async.waterfall([
    cb => userModel.getUserById(req.session.login.userId, cb),
    (user, cb) => {
      if (_.isEmpty(user)) return cb(new Error(LOGIN_NOW));
      return cb();
    },
  ], (err, result) => {
    if (err) {
      return res.redirect('/login/');
    }
    console.log(`Auth checks all done`);
    next();
  });
}

module.exports = {
  authMiddleware,
}
