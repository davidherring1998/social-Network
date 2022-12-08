const express = require("express");
const db = require("./config/connection");
const { Thoughts, User } = require("./models");
// const routes = require("./routes");

const PORT = 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(routes);


// routes
// 
// 

// gets all users
app.get("/", (req, res) => {
  db.collection("users")
    .find({})
    .toArray((err, results) => {
      if (err) throw err;
      res.send(results);
    });
});

// gets one user by id 
app.get('/user-by-id/:userId', (req,res) => {
  User.findOne({_id: req.params.userId})
  .select('-__v')
  .then((user) => {
    res.send(user)
  })
  .catch((err) => console.log(err))
});

// creates user 
app.post("/user/:username/:email", (req, res) => {
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
app.put('/user/:userId', (req,res) => {
  User.findOneAndUpdate(
    {_id: req.params.userId},
    { $set: req.body },
    { runValidators: true, new: true }
  )
  .then((userUpdate) => {
    res.send(userUpdate)
    console.log('user update successful ].')
  })
  .catch((err) => console.log(err))
})

// add a delete method to remove by id
app.delete("/user/:_id", (req, res) => {
  User.findOneAndDelete({ _id: req.params._id })
.then((user) =>
!user
  ? res.status(404).json({ message: 'No user with that ID' })
  : User.deleteMany({ _id: { $in: user.users } })
)
.then(() => res.json({ message: 'User deleted!' }))
.catch((err) => res.status(500).json(err));
});

// thoughts
// 
// 

// gets all thoughts
app.get("/thoughts", (req, res) => {
  db.collection("thoughts")
    .find({})
    .toArray((err, results) => {
      if (err) throw err;
      res.send(results);
    });
});

// gets one thought 
app.get('/thoughts-by-id/:id', (req,res) => {
  Thoughts.findOne({_id: req.params.id})
  .select('-__v')
  .then((thought) => {
    res.send(thought)
  })
  .catch((err) => console.log(err))
});


// creates a thought
app.post("/thoughts/:thoughtText", (req, res) => {
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
app.put('/thoughts/:id', (req,res) => {
  Thoughts.findOneAndUpdate(
    {_id: req.params.id},
    { $set: req.body },
    { runValidators: true, new: true }
  )
  .then((thoughts) => {
    res.send(thoughts)
    console.log('user update successful ].')
  })
  .catch((err) => console.log(err))
})


// add a delete method to remove by id
app.delete("/thoughts/:_id", (req, res) => {
  Thoughts.findOneAndDelete({ _id: req.params._id })
.then((thought) =>
!thought
  ? res.status(404).json({ message: 'No thought with that ID' })
  : Thoughts.deleteMany({ _id: { $in: thought.thoughts } })
)
.then(() => res.json({ message: 'Thought deleted!' }))
.catch((err) => res.status(500).json(err));
});



// gets all reactions
app.get("/reactions", (req, res) => {
  db.collection("reactions")
    .find({})
    .toArray((err, results) => {
      if (err) throw err;
      res.send(results);
    });
});


// reactions
//
//

app.post("/reactions/:userId/:reactionBody/:userName", (req, res) => {
  const newThought = new Thoughts({ reactionBody: req.params.reactionBody, userId: req.params.userId, userName: req.params.userName });
  newThought.save();
  if (newThought) {
    res.status(200).json(newThought);
  } else {
    console.log("something went wrong!");
    res.status(500).json({ message: "something went wrong." });
  }
});

// need a post to create reaction stored in a single thought's reaction array
// need a delete to remove a reaction by the reaction's id 


db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Connected to database on port ${PORT}`);
  });
});


// need to create virtual called reaction counts that retrieves the length of the thoughts reactions array field 
// need to create a virtual called friend count that retrieves the length of the user's friends array 


