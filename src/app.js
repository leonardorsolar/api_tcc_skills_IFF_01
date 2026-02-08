const express = require('express');

const app = express();

app.use(express.json());

app.get('/hello', (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
