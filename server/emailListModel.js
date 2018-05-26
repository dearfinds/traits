'use strict';
const Joi = require('joi');
const MongoHelper = require('./mongoHelper');

const COLL_NAME = "emailList";
const mongoHelper = new MongoHelper(COLL_NAME, {});

const emailListSchema = Joi.object().keys({
  email: Joi.string().email().required(),
});

module.exports = {
  add: mongoHelper.add,
  addMany: mongoHelper.addMany,
  query: mongoHelper.query,
  update: mongoHelper.update
};
