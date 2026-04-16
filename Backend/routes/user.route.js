import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { 
    getMyFriends, 
    getRecommendedUsers,
    sendFriendRequest,
    acceptFriendRequest,
    getFriendRequests,
    getOutgoingFriendRegs,
 } from "../controllers/user.controller.js";

//create router
const router = express.Router()

// apply auth middleware to all routes
router.use(protectRoute);

router.get ("/", getRecommendedUsers);
router.get ("/friends", getMyFriends);

//send a friend request route
router.post("/friend-request/:id", sendFriendRequest);
//accept send request
router.put("/friend-request/:id/accept", acceptFriendRequest);
//see people who have sent you a friend request
router.get("/friend-requests", getFriendRequests);

router.get("/Outgoing-friend-requests", getOutgoingFriendRegs);

export default router;