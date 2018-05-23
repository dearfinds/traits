'use strict';

const _ = require('lodash');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017'
const dbconn = [];
const dbName = 'deardata';

if (!_.isEmpty(dbconn)) return;

MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected to database")
  dbconn.push(client.db(dbName));
});

function getDBConn() {
  if (_.size(dbconn) == 0) {
    throw new Error(`Database connection not set and trying to access db.`)
  }
  return dbconn[0];
}

module.exports = {
  getDBConn,
};
