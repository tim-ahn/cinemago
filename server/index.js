require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const fetch = require('node-fetch');

const app = express();

const apiKey = '9dbf824ef684a8b724b9b0e090bb97d9';

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.post('/api/search', (req, res, next) => {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${req.body.query}&page=1&include_adult=false`)
    .then(result => result.json()
    )
    .then(data => res.json(data.results))
  ;

});

/* get request for api/details endpoint
notes: need to add name from users table to reviews table? so when merging reviews will have name showing too
*/
app.get('/api/details', (req, res, next) => {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${req.body.query}&page=1&include_adult=false`)
    .then(result => result.json())
    .then(data => res.json(data.results));

  const movieId = 496243;

  fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US&page=1`)
    .then(result => result.json())
    .then(data => res.json(data.results));

  const sql = `
    select "rating", "content"
    from "reviews"
  `;

  db.query(sql)
    .then(result => {
      const review = result.rows[0];
      if (!review) {
        next(new ClientError('No reviews currently exist', 404));
      } else {
        res.status(200).json(review);
      }
    });

});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
