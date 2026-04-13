import {StreamChat, streamChat} from "stream-chat"
import dotenv from "dotenv";

//get env variable 
const apiKey = process.env.STEAM_API_KEY;
const apiSecret = process.env.STEAM_API_SECRET;

if (!apiKey || !apiSecret) {
    console.error("Stream API key or API Secret is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertStreamUser([userData]);
        return userData
    }catch(error) {
        console.error("Error upserting Stream User", error);
    }
};

export const generateStreamToken =(userId) => {};
