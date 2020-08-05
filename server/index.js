require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const fetch = require('node-fetch');
const promise = require('promise');

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
    .catch(error => next(error));
});

/* get request for api/details endpoint
notes: need to include name to reviews too. grab it from users table using userId?
*/
app.get('/api/details/:movieId', (req, res, next) => {
  const movieId = 496243; // need to figure out how to grab dynamically

  promise.all([
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US&page=1`)
      .then(res => res.json()),
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
      .then(res => res.json())
  ])
    .then(data => {
      res.json(data);
    })
    .catch(error => next(error));

  // const sql = `
  //     select "rating", "content"
  //     from "reviews"
  //     where "movieId" = $1
  //   `;

  // const params = [movieId];
  // db.query(sql, params)
  //   .then(result => {
  //     const review = result.rows[0];
  //     if (!review) {
  //       next(new ClientError('No reviews currently exist', 404));
  //     } else {
  //       res.status(200).json(review);
  //     }
  //   })
  //   .catch(error => next(error));
});
// end feature: user-can-view-details

app.post('/api/home', (req, res, next) => {
  if (req.body.category === 'trending') {
    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`)
      .then(result => result.json()
      )
      .then(data => res.json(data.results))
      .catch(err => next(err));
  } else {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`)
      .then(result => result.json()
      )
      .then(data => res.json(data.results))
      .catch(err => next(err));
  }
});

app.get('/api/lists/:userId', (req, res, next) => {
  const id = req.params.userId;
  const sql = `
    select *
      from "lists"
    where "userId" = $1
  `;
  const params = [id];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length < 1) {
        next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
      } else {
        res.json(result.rows);
      }
    })
    .catch(err => next(err));
});

app.delete('/api/lists/:listId', (req, res, next) => {
  const id = req.params.listId;
  const sql = `
      delete from "lists" where "listId" = $1
      returning *
  `;
  const params = [id];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length < 1) {
        next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
      } else {
        res.json(result.rows);
      }
    })
    .catch(err => next(err));
});

app.post('/api/lists/:userId', (req, res, next) => {
  const id = req.params.userId;
  const name = req.body.name;
  const sql = `
    insert into "lists" ("userId", "type","name")
    values ($1, 'custom', $2)
    returning *
  `;
  const params = [id, name];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length < 1) {
        next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
      } else {
        res.json(result.rows);
      }
    })
    .catch(err => next(err));
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
