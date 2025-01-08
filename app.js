//express basic vars
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//middlewares
const notFound = require('./middlewares/notFound');
const errorsHandler = require('./middlewares/errorsHandler');

//router
const moviesRouter = require('./routers/moviesRouter');

app.use(express.static('public/imgs')); //public files in public/img

app.get('/', (req, res) => {
  res.send('server running');
});

app.use('/api/movies', moviesRouter);

//middlewares use

app.use('/', errorsHandler);
app.use('/', notFound);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
