require('dotenv').config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.js");
const corsOptions = {
  origin: "http://localhost:8081"
};

const start = async () => {
  const app = express();
  
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  for (const route in routes) {
    app.use(`/`, routes[route]);
  }

  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

start();