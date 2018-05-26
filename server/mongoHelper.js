'use strict';

const _ = require('lodash');
const assert = require('assert');
const uuid = require('uuid');
const db = require('./db');

module.exports = function mongoHelper(collectionName, opts={}) {

  function collection() {
    const dbc = db.getDBConn();
    console.log(`\nCollectionname||${JSON.stringify(collectionName)}`);
    return dbc.collection(collectionName);
  }

  function addAll(docs, cb) {
    const timestamp = Date.now();
    _.each(docs, doc => { if (!doc._id) {
      doc._id = uuid.v4();
      doc.timestamp = timestamp;
    } });

    collection().insert(docs, (err, result) => {
      // assert.equal(err, null);
      cb(err, result);
    });
  }

  function add(doc, cb) {
    return addAll([doc], cb);
  }

  function queryAll(filter, cb) {
    collection().find(filter).toArray((err, docs) => {
      // assert.equal(err, null);
      cb(err, docs);
    });
  }

  function query(filter, cb) {
    collection().findOne(filter, (err, docs) => {
      // assert.equal(err, null);
      console.log(`\nDocs Gotten back|${JSON.stringify(docs)}`);
      cb(err, docs);
    });
  }

  function updateOne(filter, update, cb) {
    collection().updateOne(filter, { $set: update }, (err, result) => {
      // assert.equal(err, null);
      cb(err, result);
    })
  }

  function removeOne(filter, cb) {
    collection().deleteOne(filter, (err, result) => {
      // assert(err, null);
      console.log(`Removing document with filter - ${JSON.stringify(filter)}`);
      cb(err, result);
    });
  }

  _.extend(this, {
    addAll,
    add,
    queryAll,
    query,
    removeOne,
    updateOne,
  });
}
