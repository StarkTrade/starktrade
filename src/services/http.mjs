import axios from "axios";

export const avnu = axios.create({
    // Todo: change base to process.env
    // baseURL: "https://starknet.api.avnu.fi/",
    baseURL: "https://sepolia.api.avnu.fi/",
})


export const dexSc = axios.create({
    // Todo: change base to process.env
    baseURL: "https://api.dexscreener.com/latest/dex/tokens",
})