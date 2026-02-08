const app = require('./app');

const PORT = parseInt(process.env.PORT, 10) || 3000;

if (PORT < 1 || PORT > 65535) {
  console.error(`Invalid PORT: ${PORT}. Must be between 1 and 65535`);
  process.exit(1);
}

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});
