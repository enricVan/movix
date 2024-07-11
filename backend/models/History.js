import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    movies: [
      {
        movie: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Movie",
          required: true
        },
        lastWatched: {
          type: Date,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("History", historySchema);
