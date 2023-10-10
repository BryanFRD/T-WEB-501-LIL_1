const database = require("./models/index.js");
const express = require("express");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:8081"
};

const start = async () => {
  const app = express();
  
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });
  
  app.route

  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

start();