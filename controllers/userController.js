const { User, Thought } = require('../models');

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

    // update a user (email or username)
    updateUser(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true } // enforce validations 
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(user)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
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

    // add a friend by id
    addFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
      .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with this id.' })
            : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    },

    // delete a friend by id
    deleteFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with this id.' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
  };
  