import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const dexScreener = axios.create({
    baseURL: process.env.DEXSCREENER_BASE_URL,
})

export const dexScreenerService = {
    getTokenDetails: async (data) => {
        return await dexScreener.get(`${data}`)
    }, 
}