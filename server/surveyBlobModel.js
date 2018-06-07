'use strict';
const Joi = require('joi');
const _ = require('lodash');
const async = require('async');
const MongoHelper = require('./mongoHelper');

const COLL_NAME = "survey";
const mongoHelper = new MongoHelper(COLL_NAME, {});
const userModel = require('./models/userModel');

const rangeSchema = Joi.object().keys({
  min: Joi.number().required(),
  max: Joi.number().required(),
});

const surveyBlobSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  fullName: Joi.string().required(),
  dob: Joi.string().required(),
  height: Joi.number().required(),
  weight: Joi.number().required(),
  caste: Joi.string().required(),
  timeline: Joi.string().required(),
  smoking: Joi.string().required(),
  drinking: Joi.string().required(),
  work: Joi.object().keys({
    designation: Joi.string().required(),
    company: Joi.string().required(),
    city: Joi.string().required(),
    pay: Joi.number().required()
  }),
  education: Joi.object().keys({
    grad: Joi.string().required(),
    undergrad: Joi.string().required(),
  }),
  preferences: Joi.object().keys({
    pay: rangeSchema.required(),
    height: rangeSchema.required(),
    age: rangeSchema.required(),
    nosmoking: Joi.boolean().default(false),
    nodrinking: Joi.boolean().default(false),
    samework: Joi.boolean().default(false),
    samecaste: Joi.boolean().default(false),
  }),
});

function add(blob, userId, cb) {
  async.waterfall([
    cb => userModel.getUserById(userId, cb),
    (user, cb) => mongoHelper.add(_.extend(blob, { email: user.email }), cb),
  ], cb);
}

module.exports = {
  add,
  addMany: mongoHelper.addMany,
  query: mongoHelper.query,
  update: mongoHelper.update
};
