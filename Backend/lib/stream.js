import pkg from "stream-chat";
const { StreamChat } = pkg;

import dotenv from "dotenv";
dotenv.config();

//get env variable 
const apiKey = process.env.STEAM_API_KEY;
const apiSecret = process.env.STEAM_API_SECRET;


//validate api key and secret
if (!apiKey || !apiSecret) {
    console.error("Stream API key or API Secret is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]); // fixed method name
        return userData
    }catch(error) {
        console.error("Error upserting Stream User", error);
    }
};

export const generateStreamToken =(userId) => {
    return streamClient.createToken(userId);
};