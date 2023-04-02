const { User, Thought } = require("../models");

// Get all thoughts
module.exports = {
  getThoughts(req, res) {
    Thought.find()
      // populete reactions
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // Get a thought by it's id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      // populete reactions
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: "No thought found with that id " })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought and add it's id to thought in user.
  createNewThought(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { userId: req.body.userId },
          { $addToSet: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: "No thought found with that id " })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  //   update a thought by it's id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: "No thought found with that id!" })
          : res.json({ message: "Thought updated", thoughtData })
      )
      .catch((err) => res.status(500).json(err));
  },

  //   delete a thought by it's id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: "No thought found with that id" })
          : res.json({ message: "thought deleted" })
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // create a reaction to a thought and store it in reaction thoughts array
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: "No thought found with that id!" })
          : res.json({ message: "Reaction created", thoughtData })
      )
      .catch((err) => res.status(500).json(err));
  },
  // delete a reaction by it's id ( to pull and remove a reaction by the reaction's `reactionId` value)
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.ThoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: "No thought found with that id!" })
          : res.json({ message: "Reaction deleted", thoughtData })
      )
      .catch((err) => res.status(500).json(err));
  },
};
