const COLL_NAME = "sessions";
const MongoHelper = require('../mongoHelper');
const mongoHelper = new MongoHelper(COLL_NAME, {});

module.exports = {
  add: mongoHelper.add,
  addMany: mongoHelper.addMany,
  query: mongoHelper.query,
  update: mongoHelper.update,
};
