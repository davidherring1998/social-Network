const router = require('express').Router();
const {
  createThought,
  getSingleThought,
  getThoughts,
} = require('../../controllers/thoughtsController');

// /api/users
router.route('/').get(getThoughts).post(createThought);

// /api/users/:userId
router.route('/:thoughtId').get(getSingleThought);

module.exports = router;
