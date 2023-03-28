// define mongoose
const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

// create a new instane of mongoose schema to define shape of Thought document
const thoughtSchema = new Schema(
  {
    // add properties and their types
    thoughtText: { type: String, require: true, minLenght: 1, maxLenght: 280 },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdVal) => moment(createdVal).format("DD MM YYYY, hh:mm a"),
    },
    username: { type: String, require: true },
    reaction: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// virtual called property 'reactionCount' to get the reaction per thoughts
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reaction.length;
});

// create a new instane of mongoose schema to define shape of Reaction documents
const reactionSchema = new Schema(
  {
    // add properties and their types
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: { type: String, require: true, maxLength: 280 },
    username: { type: String, require: true },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdVal) => moment(createdVal).format("DD MM YYYY, hh:mm a"),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// create a Thought model using the thoughtSchema
const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
