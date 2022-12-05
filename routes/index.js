const router = require('express').Router();
const userRoutes = require('./api/userRoute');
const thoughtRoutes = require('./api/thoughtRoute');

router.use('/posts', userRoutes);
router.use('/tags', thoughtRoutes);

module.exports = router;
