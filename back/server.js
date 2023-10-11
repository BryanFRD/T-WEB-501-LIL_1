require('dotenv').config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.js");
const authenticateToken = require('./middlewares/authentication.middleware.js');
const corsOptions = {
  origin: "http://127.0.0.1:5173",
  credentials: true
};

const start = async () => {
  const app = express();
  
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(authenticateToken);
  
  for (const route in routes) {
    app.use(`/`, routes[route]);
  }

  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

start();