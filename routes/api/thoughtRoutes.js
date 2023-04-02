const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  createNewThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtControllers");

// /api/thoughts
router.route("/").get(getThoughts).post(createNewThought);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").put(createReaction);

// /api/thoughts/:thoughtId/reactions/reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);
module.exports = router;
