// define mongoose
const { Schema, model } = require("mongoose");

// function to validate email
var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

// create a new instane of mongoose schema to define shape of User document
const userSchema = new Schema(
  {
    // add properties and their types
    username: { type: String, unique: true, require: true, trimmed: true },
    email: {
      type: String,
      unique: true,
      require: "email address is require",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    // agregation of thoughs and friends
    thoughts: [{ type: Schema.Types.ObjectID, ref: "Thought" }],
    friends: [{ type: Schema.Types.ObjectID, ref: "User" }],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// virtual called property 'friendCount' to get the friends per user
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// create a User model using the usersSchema
const User = model("User", userSchema);

module.exports = User;
