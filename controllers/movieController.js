const connection = require('../data/db');

function index(req, res) {
  const callback = (error, results) => {
    if (error) return res.status(500).json({ massage: err.message });

    if (results.length === 0)
      return res.status(404).json({
        error: 'not found',
        message: 'movie not found',
      });

    res.json(results);
  };

  let sql = `SELECT * FROM movies_db.movies`;

  const titleQuery = req.query.title.trim();

  console.log(titleQuery);

  //filtro per titolo o parte di titolo
  if (titleQuery) {
    sql += ` WHERE movies.title LIKE ?`;
  }

  connection.query(sql, `%${titleQuery}%`, callback);
}

function show(req, res) {
  //recupero parametro dinamico da url
  const id = req.params.id;

  const sql = `SELECT * FROM movies_db.movies WHERE movies.id = ?`;

  connection.query(sql, [id], callback);

  //show per le recensioni
}

module.exports = { index, show };
