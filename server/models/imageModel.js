'use strict';
const Joi = require('joi');
const _= require('lodash');
const async = require('async');
const MongoHelper = require('../mongoHelper');
const passwordHash = require('password-hash');
const COLL_NAME = "image";
const mongoHelper = new MongoHelper(COLL_NAME, {});

const imageSchema = Joi.object().keys({
  userId: Joi.string().email().required(),
  data: Joi.string().required(),
  // PROFILE_PICTURE,
  type: Joi.string().required(),
});

module.exports = {
  add: mongoHelper.add,
  addMany: mongoHelper.addMany,
  query: mongoHelper.query,
  queryAll: mongoHelper.queryAll,
  update: mongoHelper.update,
};
