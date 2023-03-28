const { User, Thought } = require("../models");

// Get all user
module.exports = {
  getUsers(req, res) {
    User.find().then((userData) =>
      res.json(userData).catch((err) => res.status(500).json(err))
    );
  },

  // Find an user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      // populete thoughts missing here
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
