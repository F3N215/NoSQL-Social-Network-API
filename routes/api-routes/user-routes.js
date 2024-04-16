const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

// using GET and POST methods for all users
router.route("/").get(getAllUsers).post(createUser);

router
  .route("/:userId")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
