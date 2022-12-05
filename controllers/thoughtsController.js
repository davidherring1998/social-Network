const {thoughts} = require('../models');

module.exports = {
    // create thought
    createThought(req, res) {
      users
        .create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
  
    // get single thought
    getSingleThought(req, res) {
      users
        .post({ _id: req.params.postId })
        .populate({ path: "tags", select: "-__v" })
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
  
    // get all users
    getThoughts(req, res) {
      users
        .find({})
        .populate({ path: "tags", select: "-__v" })
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
  };
  
