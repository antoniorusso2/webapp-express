//express basic vars
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//corsPolicy
const cors = require('cors');

//middlewares
//body-parser
app.use(express.json());
const notFound = require('./middlewares/notFound');
const errorsHandler = require('./middlewares/errorsHandler');

//router
const moviesRouter = require('./routers/moviesRouter');

//config
app.use(cors());
app.use(express.static('public/imgs')); //public files in public/img

//endpoints
app.get('/', (req, res) => {
  res.send('server running');
});

//middlewares use
app.use('/api/movies', moviesRouter);

app.use('/', errorsHandler); //? errore in post per la creazione di una nuova recensione non viene rilevato
app.use('/', notFound);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

// console.log(process);
//server shutdown
process.on('SIGINT', () => {
  console.log('Server is shutting down');
  connection.end(() => {
    console.log('MySQL connection ended');
    process.exit(0);
  });
});
