function addLoginSessionDetails(req, userId, cb) {
  req.session.login = { userId, timestamp: Date.now(), method: 'login' };
  req.session.save(cb);
}

function removeLoginSessionDetails(req, cb) {
  req.session.destroy(cb);
}

module.exports = { addLoginSessionDetails, removeLoginSessionDetails };
