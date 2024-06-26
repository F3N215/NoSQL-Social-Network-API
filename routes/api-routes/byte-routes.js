// start with importing controllers & dependencies
const router = require("express").Router();
const {
  getAllBytes,
  getBytesById,
  createByte,
  deleteByte,
  updateByteById,
  createReaction,
  deleteReaction,
} = require("../../controllers/byte-controller");

router.route("/").get(getAllBytes).post(createByte); // GET and POST for all bytes

router
  .route("/:byteId")
  .get(getBytesById)
  .put(updateByteById)
  .delete(deleteByte); // GET, PUT and DELETE for a single byte

router.route("/:byteId/reactions").post(createReaction); // POST for reactions to a byte

router.route("/:byteId/reactions/:reactionId").delete(deleteReaction); // DELETE for a reaction to a byte

module.exports = router;
