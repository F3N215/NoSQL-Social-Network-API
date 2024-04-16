const router = require("express").Router();
const userRoutes = require("./user-routes");
const byteRoutes = require("./byte-routes");

router.use("/user", userRoutes);
router.use("/byte", byteRoutes);

module.exports = router;
