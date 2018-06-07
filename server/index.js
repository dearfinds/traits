const async = require('async');
const db = require('./db');

async.waterfall([
  cb => db.startDB(cb),
  cb => {
    const app = require('./app').create();
    app.listen(8080, () => console.log(`Backend listening on port 8080!`));
  }
], (err, res) => {
  if (err) throw err;
  console.log('init successful');
  return;
});
