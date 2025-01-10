//express basic vars
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//corsPolicy
const cors = require('cors');
//middlewares
const notFound = require('./middlewares/notFound');
const errorsHandler = require('./middlewares/errorsHandler');

//router
const moviesRouter = require('./routers/moviesRouter');

app.use(cors());
app.use(express.static('public/imgs')); //public files in public/img

app.get('/', (req, res) => {
  res.send('server running');
});

//middlewares use
app.use('/api/movies', moviesRouter);

app.use('/', errorsHandler);
app.use('/', notFound);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
