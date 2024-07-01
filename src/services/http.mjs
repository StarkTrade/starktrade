import axios from "axios";

export const dexSc = axios.create({
    // Todo: change base to process.env
    baseURL: "https://api.dexscreener.com/latest/dex/tokens",
})