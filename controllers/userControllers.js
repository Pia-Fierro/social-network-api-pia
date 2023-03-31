const { User, Thought } = require("../models");

// **`/api/users`**

// - `GET` all users

// - `GET` a single user by its `_id` and populated thought and friend data

// - `POST` a new user:

// ```json
// // example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }
// ```

// - `PUT` to update a user by its `_id`

// - `DELETE` to remove user by its `_id`

// **BONUS**: Remove a user's associated thoughts when deleted.

// ---

// **`/api/users/:userId/friends/:friendId`**

// - `POST` to add a new friend to a user's friend list

// - `DELETE` to remove a friend from a user's friend list

// ---

module.exports = {
  // Get all user
  getUsers(req, res) {
    User.find().then((userData) =>
      res.json(userData).catch((err) => res.status(500).json(err))
    );
  },

  // Find an user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      // populete thoughts and friends
      .populate({ path: "thoughts", select: "'-__v" })
      .populate({ path: "friends", select: "'-__v'" })
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
};
