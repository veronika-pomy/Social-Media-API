const { User, Thought } = require('../models');

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
          const users = await User.find();
          res.status(200).json(users);
        } catch (err) {
          console.error(err);
          res.status(500).json(err);
        }
    },

    // get a single user
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId }).select('-__v');
        !user
          ? res.status(404).json({ message: 'No user with this id.' })
          : res.status(200).json(user);
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
    },

    // create a new user
    async createUser(req, res) {
      try {
        const newUser = await User.create(req.body);
        res.status(200).json(newUser);
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
    },

    // update a user (email or username)
    async updateUser(req, res) {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true } // enforce validations 
        );
        !updatedUser
            ? res.status(404).json({ message: 'No user with this id.' })
            : res.status(200).json(updatedUser);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },

    // delete a user
    async deleteUser(req, res) {
      try {
        const userDeleted = await User.findOneAndDelete({ _id: req.params.userId});
        await Thought.deleteMany({username: userDeleted.username}); // delete user's thoughts
        !userDeleted
            ? res.status(404).json({ message: 'No user with this id.' })
            : res.status(200).json({ message: 'User is deleted.' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },

    // add a friend by id
    async addFriend(req, res) {
      try {
        const friend = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        );
        !friend
            ? res.status(404).json({ message: 'No user with this id.' })
            : res.status(200).json(friend);

      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },

    // delete a friend by id
    async deleteFriend(req, res) {
      try {
        const deleteFriend = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        );
        !deleteFriend
            ? res.status(404).json({ message: 'No user with this id.' })
            : res.status(200).json(deleteFriend);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
  };
  