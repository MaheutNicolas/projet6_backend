const express = require("express");
const app = express();
const port = 3000;
const connectDB = require('./src/DB/Mongo');

connectDB(); // Connect to MongoDB
require('./src/Routes/AuthController')(app);
require('./src/Routes/BookController')(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});