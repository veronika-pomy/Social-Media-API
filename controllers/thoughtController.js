const { User, Thought } = require('../models');

// need to add reactons controllers

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
      Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // get a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    // creates a new thought
    // update user associated with thought
    createThought(req, res) {
      Thought.create(req.body)
        .then((thought) => {
          return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } }, 
            { new: true }
          );
        })
        .then((user) =>
          !user
            ? res.status(404).json({
                message: 'Thought created, no user with that ID',
              })
            : res.json('Created a new thought!')
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },

    // update a thought
    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true } // enforce validations 
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    
    // delete a thought from the database
    // update array for the user
    deleteThought(req, res) {
      Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
              )
        )
        .then((user) =>
          !user
            ? res.status(404).json({
                message: 'Thought deleted, but no user with this id!',
              })
            : res.json({ message: 'Thought deleted!' })
        )
        .catch((err) => res.status(500).json(err));
    },   
  };

