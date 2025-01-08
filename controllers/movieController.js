const connection = require('../data/db');

function index(req, res) {
  const sql = `SELECT * FROM movies_db.movies;`;

  connection.query(sql, (err, movies) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(movies);
  });
}

function show(req, res) {
  //recupero parametro dinamico da url
  const id = req.params.id;

  const sql = `SELECT * FROM movies_db.movies WHERE movies.id = ?`;

  connection.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ massage: err.message });

    if (result.length === 0)
      return res.status(404).json({
        error: 'not found',
        message: 'movie not found',
      });

    res.json(result);
  });

  //show per le recensioni
}

module.exports = { index, show };
