'use strict';
const Joi = require('joi');
const MongoHelper = require('./mongoHelper');

const COLL_NAME = "user";
const mongoHelper = new MongoHelper(COLL_NAME, {});

const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  referral: Joi.object().keys({
    code: Joi.string().optional(),
    used: Joi.string().boolean().default(false),
  }).optional(),
  hashedPassword: Joi.string().required(),
});

module.exports = {
  add: mongoHelper.add,
  addMany: mongoHelper.addMany,
  query: mongoHelper.query,
  update: mongoHelper.update
};
