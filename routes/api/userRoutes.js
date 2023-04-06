const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser
} = require('../../controllers/userController');
// add update user route

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

module.exports = router;