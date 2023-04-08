const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
      try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
    },

    // get a single thought
    async getSingleThought(req, res) {
        try {
          const thought = await Thought.findOne({ _id: req.params.thoughtId });
          !thought
            ? res.status(404).json({ message: 'No thought with this Id.' })
            : res.status(200).json(thought);
        } catch (err) {
          console.error(err);
          res.status(500).json(err);
        }
     },

    // creates a new thought
    // update user associated with thought
    async createThought(req, res) {
      try {
        const newThought = await Thought.create(req.body);
        const userNewthought = await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: newThought._id } }, 
          { new: true }
        );
        !userNewthought
            ? res.status(404).json({
                message: 'Thought created, no user with this Id.',
              })
            : res.status(200).json('Created a new thought!')
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
    },

    // update a thought
    async updateThought(req, res) {
      try {
        const updatedthought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true } // enforce validations 
        );
        !updatedthought
          ? res.status(404).json({ message: 'No thought with this id.' })
          : res.status(200).json(updatedthought);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },

    // delete a thought from the database
    // update array for the user
    async deleteThought(req, res) {
      try {
        const deletedthought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
        !deletedthought
            ? res.status(404).json({ message: 'No thought with this id.' })
            : await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
              )
              .then((user) =>
                !user
                  ? res.status(404).json({ message: 'Thought deleted, but no user with this id.'})
                  : res.status(200).json('Thought deleted.'))
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },

    // create a reaction to thought
    async createReaction(req, res) {
      try {
        const thoughtReaction = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        );
        !thoughtReaction
            ? res.status(404).json({ message: 'No thought with this id.' })
            : res.status(200).json(thoughtReaction);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },

    // delete a reaction to thought
    async deleteReaction(req, res) {
      try {
        const deleteReaction = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        );
        !deleteReaction
            ? res.status(404).json({ message: 'No thought with this id.' })
            : res.json(deleteReaction);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
  };

