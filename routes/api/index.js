const router = require('express').Router();
const userRoutes = require('./userRoute');
const thoughtRoutes = require('./thoughtRoute');

router.use('/user', postRoutes);
router.use('/thought', tagRoutes);

module.exports = router;
