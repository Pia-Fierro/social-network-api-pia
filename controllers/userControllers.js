const { User, Thought } = require("../models");

// **BONUS**: Remove a user's associated thoughts when deleted.
// **``**

// - `POST` to add a new friend to a user's friend list

// - `DELETE` to remove a friend from a user's friend list

// ---

module.exports = {
  // Get all user
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // Find an user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      // populete thoughts and friends
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user found with that id " })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
  //   create an user
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => {
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // update an existing user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user found with that id!" })
          : res.json({ message: "user updated" })
      )
      .catch((err) => res.status(500).json(err));
  },
  // delete an user and associated thoughst
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user found with that id" })
          : res.json({ message: "user deleted" })
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user found with that id" })
          : res.json({ message: "friend added" })
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
