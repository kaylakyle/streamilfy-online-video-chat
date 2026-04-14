import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { 
    getMyFriends, 
    getRecommendedUsers,
    sendFriendRequest,
    acceptFriendRequest,
    acceptFriendRequests,
 } from "../controller/user.controller.js";

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
router.put("/friend-request/:id/accept", acceptFriendRequests);

export default router;