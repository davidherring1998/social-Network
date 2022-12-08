const express = require("express");
const path = require("path");
const db = require("./config/connection");
const { Thoughts, User } = require("./models");
const routes = require("./controllers");

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Connected to database on port ${PORT}`);
  });
});
