const router = require("express").Router();
const { User } = require("../models");
const db = require("../config/connection");

// gets all users
router.get("/", (req, res) => {
  db.collection("users")
    .find({})
    .toArray((err, results) => {
      if (err) throw err;
      res.send(results);
    });
});

// gets one user by id
router.get("/:userId", (req, res) => {
  User.findOne({ _id: req.params.userId })
    .select("-__v")
    .then((user) => {
      res.send(user);
    })
    .catch((err) => console.log(err));
});

// creates user
router.post("/:username/:email", (req, res) => {
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

// add a put method to update by id
router.put("/:userId", (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((userUpdate) => {
      res.send(userUpdate);
      console.log("user update successful.");
    })
    .catch((err) => console.log(err));
});

// add a delete method to remove by id
router.delete("/:userId", (req, res) => {
  User.findOneAndDelete({ _id: req.params.userId })
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No user with that ID" })
        : User.deleteMany({ _id: { $in: user.users } })
    )
    .then(() => res.json({ message: "User deleted!" }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
