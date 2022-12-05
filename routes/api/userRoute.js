const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  getUsers,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:getUsers
router.route('/:userId').get(getSingleUser);

module.exports = router;
