const connection = require('../data/db');

function index(req, res) {
  res.json({
    message: 'elenco di tutti i film',
  });
}

module.exports = { index };
