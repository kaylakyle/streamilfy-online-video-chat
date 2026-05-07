import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ✅ FIXED
      required: true,
    },

    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ✅ FIXED
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// ✅ FIXED MODEL NAME
const FriendRequest = mongoose.model(
  "FriendRequest",
  friendRequestSchema
);

export default FriendRequest;