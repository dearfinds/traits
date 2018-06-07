'use strict';
const Joi = require('joi');
const _= require('lodash');
const async = require('async');
const MongoHelper = require('../mongoHelper');
const passwordHash = require('password-hash');
const COLL_NAME = "user";
const mongoHelper = new MongoHelper(COLL_NAME, {});

const USER_EXISTS = 'User with email exists';
const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  referral: Joi.object().keys({
    code: Joi.string().optional(),
    used: Joi.boolean().default(false),
  }).optional(),
  hashedPassword: Joi.string().required(),
});

function getUserById(id, cb) {
  mongoHelper.query({ _id: id }, (err, user) => {
    if (err || !user) return cb(null, {});
    return cb(null, user);
  });
}

function getUserByEmail(email, cb) {
  mongoHelper.query({ email }, (err, user) => {
    if (err || !user) return cb(null, {});
    return cb(null, user);
  });
}

function matchPassword(email, password, cb) {
  async.waterfall([
    cb => getUserByEmail(email, cb),
    (user, cb) => {
      console.log(`\nUSERR||${JSON.stringify(user)}`);
      if (_.isEmpty(user) || !user.hashedPassword) return cb(null, { matched: false });
      if (!passwordHash.verify(password, user.hashedPassword))
        return cb(null, { matched: false });
      console.log(`\nMatched and returning`);
      return cb(null, { matched: true, userId: user._id });
    }
  ], cb);
}

function createUser(email, password, cb) {
  async.waterfall([
    cb => getUserByEmail(email, cb),
    (user, cb) => {
      console.log(`UserExists?|${JSON.stringify(user)}`);
      // Looks like empty object is true
      if (!_.isEmpty(user)) {
        console.log(`\nPassing in for empty object`);
        return cb(Error(USER_EXISTS))
      };
      const hashedPassword = passwordHash.generate(password);
      console.log(`\nAbout to add user now`);
      mongoHelper.add({ email, hashedPassword }, cb);
    },
    (res, cb) => getUserByEmail(email, cb),
    (user, cb) => {
      console.log(`\nInsertedUserNow|${JSON.stringify(user)}`);
      cb(null, user._id);
    },
  ], cb);
}

module.exports = {
  add: mongoHelper.add,
  addMany: mongoHelper.addMany,
  query: mongoHelper.query,
  update: mongoHelper.update,
  matchPassword,
  USER_EXISTS,
  createUser,
  getUserById,
};
