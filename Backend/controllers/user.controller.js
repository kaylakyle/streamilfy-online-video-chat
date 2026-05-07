import FriendRequest from "../model/FriendRequest.js";
import User from "../model/user.js";

// Get recommended users
export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, // exclude yourself
        { _id: { $nin: currentUser.friends } }, // exclude friends
        { isOnboarded: true },
      ],
    });

    return res.status(200).json(recommendedUsers);
  } catch (error) {
    console.log("Error in getRecommendedUsers Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get my friends
export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );

    return res.status(200).json(user.friends);
  } catch (error) {
    console.log("Error in getMyFriends Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Send friend request
export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    // prevent sending request to yourself
    if (myId === recipientId) {
      return res
        .status(400)
        .json({ message: "You cannot send a friend request to yourself" });
    }

    // check if recipient exists
    const recipient = await User.findById(recipientId);

    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    // check if already friends
    if (recipient.friends.includes(myId)) {
      return res
        .status(400)
        .json({ message: "You are already friends" });
    }

    // check if request already exists
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Friend request already exists",
      });
    }

    // create request
    const newFriendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    return res.status(201).json(newFriendRequest);
  } catch (error) {
    console.log("Error in sendFriendRequest Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Accept friend request
export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({
        message: "Friend request not found",
      });
    }

    // verify recipient
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    // update status
    friendRequest.status = "accepted";
    await friendRequest.save();

    // add users to each other's friends list
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    return res.status(200).json({
      message: "Friend request accepted",
    });
  } catch (error) {
    console.log("Error in acceptFriendRequest Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get incoming friend requests
export async function getFriendRequests(req, res) {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    return res.status(200).json({
      incomingReqs,
      acceptedReqs,
    });
  } catch (error) {
    console.log("Error in getFriendRequests Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get outgoing friend requests
export async function getOutgoingFriendReqs(req, res) {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    return res.status(200).json(outgoingRequests);
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}