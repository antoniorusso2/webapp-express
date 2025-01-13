const connection = require('../data/db');

//index
function index(req, res) {
  const callback = (error, results) => {
    if (error) return res.status(500).json({ message: error.message });
    // console.log(results);

    //aggiunta immagini ad ogni elemento dell'array
    results.forEach((el) => {
      //aggiunta chiave image all'oggetto
      el.image = `${process.env.IMG_PATH}/${el.image}`;
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
    FROM movies
    JOIN reviews
    ON movies.id = reviews.movie_id`;

  //recupero parametro query string
  const titleQuery = req.query.title;

  //filtro per titolo o parte di titolo
  if (titleQuery) {
    //concatenazione query sql in caso il campo esista
    sql += ` 
      WHERE movies.title LIKE ?
      GROUP BY movies.id
      ORDER BY movies.title;`;
    connection.query(sql, `%${titleQuery.trim()}%`, callback);
    return;
  }

  //ordine alfabetico per titolo
  sql += `
    GROUP BY movies.id
    ORDER BY movies.title;`;
  //ricerca di tutti i post normalmente
  // console.log(sql);
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
    movie.image = `${process.env.IMG_PATH}/${movie.image}`;

    //reviews del film
    const reviewsQuery = `SELECT * FROM movies_db.reviews WHERE movie_id = ?`;

    //aggiunta reviews all'oggetto
    connection.query(reviewsQuery, [id], (err, results) => {
      if (err) return res.status(500).json({ message: err.message });

      //aggiungo la chiave reviews all'oggetto movies
      movie.reviews = results;
      res.json(movie);
    });
  });

  //show per le recensioni
}

//store per l' aggiunta di una nuova recensione
function storeReview(req, res) {
  //id del film
  const id = req.params.id;

  //recupero parametri dalla body request
  const { name, text, vote } = req.body;
  // console.log(req.body, id);

  //controllo se i campi testo e nome sono presenti
  if (!name || !vote) return res.status(400).json({ error: 'Missing required fields', message: 'name and vote are required' });

  //query
  const sql = `INSERT INTO reviews (name, text, vote, movie_id) VALUES (?,?,?,?)`;

  connection.query(sql, [name, text, vote, id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });

    // console.log(results);

    res.status(201).json({ message: 'review created successfully', newId: results.insertId });
  });
}

module.exports = { index, show, storeReview };
