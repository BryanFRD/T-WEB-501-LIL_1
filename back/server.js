const express = require("express");
const cors = require("cors");
const database = require('./db/database');
const corsOptions = {
  origin: "http://localhost:8081"
};

const start = async () => {  
  const app = express();
  
  // const err = await database.sync({force: false})
  //   .then(() => {console.log('Database synchronized!')})
  //   .catch(err => err);
  
  // if(err){
  //   console.log(`Error while trying to synchronize with the database!\nError: `, err);
  //   return;
  // }
  
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });

  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

start();