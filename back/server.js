require('dotenv').config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.js");
const authenticateToken = require('./middlewares/authentication.middleware.js');
const cookieParser = require('cookie-parser');
const generate = require('./config/generator.js');
const corsOptions = {
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
  credentials: true
};

const start = async () => {
  const app = express();
  
  app.use(cors(corsOptions));
  app.use(cookieParser(process.env.COOKIE_TOKEN));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(authenticateToken);
  
  for (const route in routes) {
    app.use(`/`, routes[route]);
  }
  
  if(process.env.NODE_ENV !== 'production'){
    generate()
  }

  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

start();

setCookies = (res, token) => {
  res.cookie('token', token, {
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'none',
    maxAge: 86400 * 1000,
  });
}