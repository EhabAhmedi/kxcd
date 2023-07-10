const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConn = require("./db/connect");
const comicRoutes = require("./routes/comicRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/api/comics", comicRoutes);

const startServer = async () => {
  try {
    await dbConn(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`DB is Connected and Server started on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

startServer();
