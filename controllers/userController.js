const { users } = require("../models");

module.exports = {
  // create user
  createUser(req, res) {
    users
      .create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // get single user
  getSingleUser(req, res) {
    users
      .post({ _id: req.params.postId })
      .populate({ path: "tags", select: "-__v" })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // get all users
  getUsers(req, res) {
    users
      .find()
      .populate({ path: "tags", select: "-__v" })
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
};
