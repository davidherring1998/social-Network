const connection = require("../config/connection");
const { User, Thoughts } = require("../models");

connection.once("open", async () => {
  // Delete the entries in the collection
  await User.deleteMany({});
  await Thoughts.deleteMany({});

  await User.insertMany([
    { userName: "david_herring", email: "userone@gmail.com" },
    { userName: "brooke_herring", email: "usetwo@gmail.com" },
    { userName: "colton_walker", email: "userthree@gmail.com" },
    { userName: "carson_cataldo", email: "userfour@gmail.com" },
    { userName: "kenny_sprout", email: "userfive@gmail.com" },
    { userName: "kyle_brewer", email: "usersix@gmail.com" },
  ]).then((user, err) => {
    if (err) throw err;
    console.log("users data has been inserted.");
  });

  await Thoughts.insertMany([
    { thoughtText: "I love the color red." },
    { thoughtText: "Malls are great places to shop; I can find everything I need under one roof." },
    { thoughtText: "Jeanne wished she has chosen the red button." },
    { thoughtText: "The wake behind the boat told of the past while the open sea for told life in the unknown future." },
    { thoughtText: "Dan took the deep dive down the rabbit hole." },
    { thoughtText: "The sky is clear; the stars are twinkling." },
  ]).then((user, err) => {
    if (err) throw err;
    console.log("Thoughts data has been inserted.");
  });
});
