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

  const titleQuery = req.query.title;

  //filtro per titolo o parte di titolo
  if (titleQuery) {
    //concatenazione query sql in caso il campo esista
    sql += ` WHERE movies.title LIKE ?`;
    connection.query(sql, `%${titleQuery.trim()}%`, callback);
    return;
  }

  //ordine alfabetico per titolo
  sql += ` ORDER BY title`;
  //ricerca di tutti i post normalmente
  connection.query(sql, callback);
}

function show(req, res) {
  //recupero parametro dinamico da url
  const id = req.params.id;

  // const callback = (error, results) => {
  //   if (error) return res.status(500).json({ massage: err.message });

  //   if (results.length === 0)
  //     return res.status(404).json({
  //       error: 'not found',
  //       message: 'movie not found',
  //     });

  //   res.json(results);

  // };

  const sql = `SELECT * FROM movies_db.movies WHERE movies.id = ?`;

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ massage: err.message });

    if (results.length === 0) {
      return res.status(400).json({
        error: 'not found',
        message: 'movie not found',
      });
    }

    const movie = results[0];

    const reviewSQL = `SELECT * FROM movies_db.reviews WHERE movie_id = ?`;

    connection.query(reviewSQL, [id], (err, results) => {
      if (err) return res.status(500).json({ message: err.message });

      movie.reviews = results;
      res.json(movie);
    });
  });

  connection;

  //show per le recensioni
}

module.exports = { index, show };
