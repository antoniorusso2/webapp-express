const connection = require('../data/db');
const baseImagePath = 'http://localhost:3003/movies-covers/';
function index(req, res) {
  const callback = (error, results) => {
    if (error) return res.status(500).json({ massage: err.message });
    // results.image: 'localhost:3003/movies-covers/inception.jpg'
    console.log(results);

    //aggiunta immagini ad ogni elemento dell'array
    results.forEach((el) => {
      //path di base immagini in local host

      //formattazione del titolo dell'immagine con lettere minuscole e _ invece di spazi

      //aggiunta chiave image all'oggetto
      el.image = `${baseImagePath}/${el.image}`;
    });

    if (results.length === 0)
      return res.status(404).json({
        error: 'not found',
        message: 'movie not found',
      });

    res.json(results);
  };

  let sql = `
    SELECT movies.*, AVG(vote) as avg_vote
    FROM movies_db.movies
    JOIN movies_db.reviews
    ON movies.id = reviews.movie_id`;

  const titleQuery = req.query.title;

  //filtro per titolo o parte di titolo
  if (titleQuery) {
    //concatenazione query sql in caso il campo esista
    sql += ` WHERE movies.title LIKE ?`;
    connection.query(sql, `%${titleQuery.trim()}%`, callback);
    return;
  }

  //ordine alfabetico per titolo
  sql += `
    GROUP BY movies.id
    ORDER BY title;`;
  //ricerca di tutti i post normalmente
  connection.query(sql, callback);
}

function show(req, res) {
  //recupero parametro dinamico da url
  const id = req.params.id;

  const sql = `SELECT movies.*, AVG(vote) as avg_vote
    FROM movies_db.movies
    JOIN movies_db.reviews
    ON movies.id = movies.id
    WHERE movies.id = ?
    GROUP BY movies.id`;

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ massage: err.message });

    if (results.length === 0) {
      return res.status(400).json({
        error: 'not found',
        message: 'movie not found',
      });
    }

    const movie = results[0];
    movie.image = `${baseImagePath}/${movie.image}`;

    //reviews del film
    const reviewSQL = `SELECT * FROM movies_db.reviews WHERE movie_id = ?`;

    //aggiunta reviews all'oggetto
    connection.query(reviewSQL, [id], (err, results) => {
      if (err) return res.status(500).json({ message: err.message });

      //aggiungo la chiave reviews all'oggetto movies
      movie.reviews = results;
      res.json(movie);
    });
  });

  connection;

  //show per le recensioni
}

module.exports = { index, show };
