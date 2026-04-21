const express = require("express");
const http = require('http');
const app = express();
const path = require('path');
const connectDB = require('./src/DB/Mongo');
const bookRoutes = require('./src/Routes/Book');
const authRoutes = require('./src/Routes/Auth');

const port = normalizePort(process.env.PORT || '4000');

connectDB();
require('./src/Middleware/Cors')(app);

app.use(express.json()); 

app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);

// ----------- Helper -----------

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};


function errorHandler(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};
