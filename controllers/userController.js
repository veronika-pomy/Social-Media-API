const { User, Thought } = require('../models');

// add update user controller
// post and delete user friends 

module.exports = {
    // get all users
    getUsers(req, res) {
      User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // get a single user
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
      User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    // delete a user
    deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params.userId})
        .then((user) => Thought.deleteMany({username: user.username})) // delete user's thoughts
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json({ message: 'User is deleted.' })
        )
        .catch((err) => res.status(500).json(err));
    },
  };
  