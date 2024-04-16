const router = require("express").Router();

router.use((req, res) => {
  return res.status(404).send("404 Error - Page Not Found!");
});
module.exports = router;
