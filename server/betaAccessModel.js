'use strict';
const Joi = require('joi');
const async = require('async');
const _ = require('lodash');
const MongoHelper = require('./mongoHelper');

const COLL_NAME = "betaAccess";
const mongoHelper = new MongoHelper(COLL_NAME, {});

const betaAccessSchema = Joi.object().keys({
  code: Joi.string().email().required(),
  email: Joi.string().email().required()
});

function isValidCode(code, cb) {
  async.waterfall([
    cb => mongoHelper.query({ code }, cb),
    (docs, cb) => cb(null, { exists: !_.isEmpty(docs), docs }),
  ], cb);
}

module.exports = {
  add: mongoHelper.add,
  addMany: mongoHelper.addMany,
  query: mongoHelper.query,
  update: mongoHelper.update,
  isValidCode,
};
