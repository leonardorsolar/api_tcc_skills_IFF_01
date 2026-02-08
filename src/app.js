const express = require('express');

const app = express();

app.use(express.json({ limit: '100kb' }));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/hello', (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

if (process.env.NODE_ENV === 'test') {
  app.get('/test-error', (req, res, next) => {
    const error = new Error('Test error');
    next(error);
  });
}

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, _next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  } else {
    console.error('Error:', err.message);
  }
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
