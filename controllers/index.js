const router = require("express").Router();

const userRoutes = require("./userController");
const thoughtsRoutes = require("./thoughtsController");

router.use("/", userRoutes);
router.use("/thoughts", thoughtsRoutes);

module.exports = router;
