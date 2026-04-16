
import friendRequest from "../model/FriendRequest.js";
import User from "../model/user.js";


export async function getRecommendedUsers(req, res) {
    try {
  // get current user first
  const currentUserId = req.user.id;
  const currentUser = req.user

  //get recommended users
  const RecommendedUsers = await user.find({
    $and: [
        {_id: {ne:currentUserId}}, // this will exclude my user not to be seen when i log in so i dont see my self profile
        {_id: {nin:currentUser.friends}},//will exclude my current user friends so i dont send request to them again cos we are friends
        {isOnboarded: true} // this wil remove not onboared pple 
    ]
  })
  return res.status(200).json (recommendedUsers);
    }catch(error){
        console.log("Error in getRecommendedUser Controller", error.message);
       res.status(500).json({message:"Internal Server Error"}); 
    }
}

export async function getMyFriends(req, res) {
    try {
   //get user
   const user = await User.findById(req.user.id)
    .select("friends")
    .populate("friends", "fullName profilePic nativeLanguage learningLanguage");


   return res.status(200).json (user.friends);
    }catch(error){
        console.log("Error in getMyFriends Controller", error.message);
       res.status(500).json({message:"Internal Server Error"}); 
    }
}


export async function sendFriendRequest(req, res){
    try{
    //get current authenticated user id
    const myId = req.user.id;
    const { id:recipientId} =req.params

    //prevent sending request to yourself
    if (myId === recipientId) {
         return res.status(400).json ({message: "You can't send friend request to yourself"});
    }

    //check if recipient exist
    const recipient = await User.findById(recipientId)
     if ( recipient) {
         return res.status(404).json ({message: "Recipient not found"});
    }

    //check if we are already friends
    if ( recipient.friends.includes(myId)) {
         return res.status(200).json ({message: "You are already friends with the user"});
    }

    //check if already sent a request or if request exists
    const existingRequest = await friendRequest.findOne({
        $and: [
            {sender: myId, recipient: recipientId},
            {sender: recipientId, recipient: myId},
        ],
    })

    if(existingRequest){
        return res
        .status(400)
        .json({message:"A friend request already exist between you and this user"})
    }

    //create a friend request
    const friendRequest = await FriendRequest.create({
         sender:myId,
         recipient:recipientId,
    });

     res.status(200).json(FriendRequest);

    }catch(error){
      console.log("Error in sendFriendRequest Controller", error.message);
      res.status(500).json({message:"Internal Server Error"}); 
    }
}

export async function acceptFriendRequest (req, res) {
     try{
      //get requires id
      const {id:requuestId} = req.params

      //get client requestid
      const friendRequest = await FriendRequest.findById(requuestId);

      if (!friendRequest) {
         return res.status(404).json ({message: "Friend request not found"});
    }

    //verify if current user is the recipient
     if (friendRequest.recipient.toString() !== req.user.id) {
         return res.status(403).json ({message: "You are not authorised to accept this request"});
    }

    friendRequest.status ="accepted";
    await friendRequest.save();  //to database

    //add each user to others friends array
    await User.findByIdAndUpdate(friendRequest.sender, {
        $addToSet: {friends: friendRequest.recipient}, // addtoset add element in array only they do not exist
    });

    await User.findOneAndUpdate(friendRequest.recipient, {
        $addToSet: {friends: friendRequest.sender},
    });

    return res.status(200).json ({message: "You are not authorised to accept this request"});
     }catch(error){
        console.log("Error in acceptFriendRequest Controller", error.message);
        res.status(500).json({message:"Internal Server Error"}); 
     }
}


export async function getFriendRequests (req, res) {
    try{
   //get incoming requests
   const incomingReqs = await FriendRequest.find({
       recipient: req.user.id,
       status: "pending",
   }).populate("sender","fullName profilePic nativeLanguage learningLangauge");

   const acceptdRegs = await FriendRequest.find({
      sender: req.user.id,
       status: "accepted",
   }).populate("recipient","fullName profilePic");

     res.status(200).json ({incomingReqs, acceptdRegs});
    }catch(error){
        console.log("Error in getFriendRequest Controller", error.message);
        res.status(500).json({message:"Internal Server Error"}); 
    }
}

export async function getOutgoingFriendRegs (req, res) {
    try{
     const OutgoingRequests  = await FriendRequest.find({
      sender: req.user.id,
       status: "pending",
   }).populate("recipient","fullName profilePic nativeLanguage learningLangaugec");

   res.status(200).json ({OutgoingRequests});
    }catch(error){
        console.log("Error in OutgoingRequests Controller", error.message);
        res.status(500).json({message:"Internal Server Error"}); 
    }
}