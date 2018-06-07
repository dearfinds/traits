const async = require('async');
const _ = require('lodash');

function loginRedirectMiddleware(req, res, next) {
  const userId = _.get(req, 'session.login.userId', undefined);
  if (userId) {
    console.log(`UserId present|| going to profile`);
    return res.redirect('/profile');
  }
  console.log(`UserId not present|| going to login`);
  next();
}

module.exports = {
  loginRedirectMiddleware,
};
