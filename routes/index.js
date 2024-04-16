const router = require("express").Router();
const apiRoutes = require("./api-routes");

router.use("/api", apiRoutes);

router.use((req, res) => {
  return res.status(404).send("404 Error - Page Not Found!");
});
module.exports = router;
