const express = require("express");
const db = require("./config/connection");
const { Thoughts, User } = require("./models");
const routes = require("./routes");

const PORT = 3001;
const app = express();

// read routes
app.get("/read-users", (req, res) => {
  db.collection("users")
    .find({})
    .toArray((err, results) => {
      if (err) throw err;
      res.send(results);
    });
});

app.get("/read-thoughts", (req, res) => {
  db.collection("thoughts")
    .find({})
    .toArray((err, results) => {
      if (err) throw err;
      res.send(results);
    });
});

// create routes
app.post("/create-user/:username/:email", (req, res) => {
  const newUser = new User({
    userName: req.params.username,
    email: req.params.email,
  });
  newUser.save();
  if (newUser) {
    res.status(200).json(newUser);
  } else {
    console.log("something went wrong!");
    res.status(500).json({ message: "something went wrong." });
  }
});

app.post("/create-thought/:thoughtText", (req, res) => {
  const newThought = new Thoughts({ thoughtText: req.params.thoughtText });
  newThought.save();
  if (newThought) {
    res.status(200).json(newThought);
  } else {
    console.log("something went wrong!");
    res.status(500).json({ message: "something went wrong." });
  }
});

// delete routes
app.delete("/delete-one-user/:username/:email", (req, res) => {
  User.findOneAndDelete({ userName: req.params.username, email: req.params.email }),
    (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`deleted ${result}`);
      } else {
        console.log("something went wrong.");
      }
    };
});

app.delete("/delete-one-thought/:objectId", (req, res) => {
  User.findOneAndDelete({ thoughtText: req.params.username }),
    (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`deleted ${result}`);
      } else {
        console.log("something went wrong.");
      }
    };
});


db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Connected to database on port ${PORT}`);
  });
});
