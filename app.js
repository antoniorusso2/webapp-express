console.log('app');

const express = require('express');
const app = express();
const port = 3000;

const notFound = require('./middlewares/notFound');
const errorsHandler = require('./middlewares/errorsHandler');

app.get('/', (req, res) => {
  res.send('server running');
});

app.use('/', errorsHandler);
app.use('/', notFound);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
