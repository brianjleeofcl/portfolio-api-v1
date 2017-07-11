const express = require('express');
const app = express();
const boom = require('boom');

if (process.env.NODE_ENV !== 'production') require('dotenv').load()

app.disable('x-powered-by');

app.use(require('morgan')('dev'), require('body-parser').text());

app.use('/v1',require('./v1/api'));

app.use((req, res, next) => {
  next(boom.notFound());
});

app.use((err, req, res, next) => {
  const { output, message } = err;
  res.status(output.statusCode);
  res.send(message);
});

module.exports = app;
