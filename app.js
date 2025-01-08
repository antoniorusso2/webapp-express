console.log('app');

//express basic vars
const express = require('express');
const app = express();
const port = 3000;

//middlewares
const notFound = require('./middlewares/notFound');
const errorsHandler = require('./middlewares/errorsHandler');

app.get('/', (req, res) => {
  res.send('server running');
});

//middlewares use
app.use(express.static('public/imgs')); //public files in public/img

app.use('/', errorsHandler);
app.use('/', notFound);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
