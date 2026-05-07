import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";

import {
  getMyFriends,
  getRecommendedUsers,
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequests,
  getOutgoingFriendReqs,
} from "../controllers/user.controller.js";

const router = express.Router();

// protect all routes
router.use(protectRoute);

// recommended users
router.get("/", getRecommendedUsers);

// friends
router.get("/friends", getMyFriends);

// send friend request
router.post("/friend-request/:id", sendFriendRequest);

// accept friend request
router.put("/friend-request/:id/accept", acceptFriendRequest);

// incoming friend requests
router.get("/friend-requests", getFriendRequests);

// outgoing friend requests
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

export default router;