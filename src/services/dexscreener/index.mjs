import axios from "axios";

const dexScreener = axios.create({
    // Todo: change base to process.env
    baseURL: "https://api.dexscreener.com/latest/dex/tokens",
})

export const dexScreenerService = {
    getTokenDetails: async (data) => {
        return await dexScreener.get(`${data}`)
    }, 
}