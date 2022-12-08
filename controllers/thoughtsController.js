const router = require("express").Router();
const { Thoughts } = require("../models");
const db = require("../config/connection");

// gets all thoughts
router.get("/thoughts", (req, res) => {
  db.collection("thoughts")
    .find({})
    .toArray((err, results) => {
      if (err) throw err;
      res.send(results);
    });
});

// gets one thought
router.get("/:id", (req, res) => {
  Thoughts.findOne({ _id: req.params.id })
    .select("-__v")
    .then((thought) => {
      res.send(thought);
    })
    .catch((err) => console.log(err));
});

// creates a thought
router.post("/:thoughtText", (req, res) => {
  const newThought = new Thoughts({ thoughtText: req.params.thoughtText });
  newThought.save();
  if (newThought) {
    res.status(200).json(newThought);
  } else {
    console.log("something went wrong!");
    res.status(500).json({ message: "something went wrong." });
  }
});

// update by id
router.put("/:id", (req, res) => {
  Thoughts.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((thoughts) => {
      res.send(thoughts);
      console.log("user update successful.");
    })
    .catch((err) => console.log(err));
});

// add a delete method to remove by id
router.delete("/:_id", (req, res) => {
  Thoughts.findOneAndDelete({ _id: req.params._id })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "No thought with that ID" })
        : Thoughts.deleteMany({ _id: { $in: thought.thoughts } })
    )
    .then(() => res.json({ message: "Thought deleted!" }))
    .catch((err) => res.status(500).json(err));
});

// gets all reactions
router.get("/reactions", (req, res) => {
  db.collection("reactions")
    .find({})
    .toArray((err, results) => {
      if (err) throw err;
      res.send(results);
    });
});

// reactions
router.post("/reactions/:thoughtsId/:reaction", (req, res) => {
  Thoughts.findOneAndUpdate(
    { _id: req.params.thoughtsId },
    { $push: { reactionBody: req.params.reaction } }
  )
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

module.exports = router;
