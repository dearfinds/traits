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
  userId: Joi.string().guid().required(),
  // email: Joi.string().email().required(),
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

function addNestingInDetails(blob) {
  const newDetails = {};
  const detailKeys = _.keys(blob.details);
  _.each(detailKeys, key => {
    newDetails[key.split('_').join('.')] = blob.details[key];
  });
  blob.details = newDetails;
}

// blob matches the schema with dot nesting for details - this isnt accurate
function cleanNestingInDetails(blob) {
  const newDetails = {};
  const detailKeys = _.keys(blob.details);
  _.each(detailKeys, key => {
    newDetails[key.split('.').join('_')] = blob.details[key];
  });
  blob.details = newDetails;
}

function add(blob, userId, cb) {
  return mongoHelper.add(_.extend(blob, { userId }), cb);
}

function upsert(blob, userId, cb) {
  console.log(`\nBlobPrinting|${JSON.stringify(blob)}`);
  cleanNestingInDetails(blob);
  console.log(`\nCleanedBlobPrinting|${JSON.stringify(blob)}`);
  return mongoHelper.upsert({ userId }, blob, cb);
}

// Have to reverse back all _ to . for frontend.
function query(userId, cb) {
  console.log(`\nComing in to surveyBlobQuery||${userId}`);
  async.waterfall([
    cb => mongoHelper.query({ userId }, cb),
    async.asyncify(survey => {
      if (_.isEmpty(survey)) return {};
      addNestingInDetails(survey);
      return survey;
    })
  ], cb);
}

module.exports = {
  add,
  addMany: mongoHelper.addMany,
  upsert,
  query,
  update: mongoHelper.update
};
