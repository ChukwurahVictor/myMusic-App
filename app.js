const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();

const artisteRoutes = require('./routes/artistes');
const albumRoutes = require('./routes/albums');
const songRoutes = require('./routes/songs');
const genreRoutes = require('./routes/genres');

//Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Database Connection
const db = require('./config/database');
 db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use('/artistes', artisteRoutes);
app.use('/albums', albumRoutes);
app.use('/songs', songRoutes);
app.use('/genres', genreRoutes);

//Port listener
const port = process.env.port || 4040;
app.listen(port, () => {
   console.log(`Server running on port ${port}`)
});