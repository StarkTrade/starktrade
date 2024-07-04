import axios from "axios";

export const avnu = axios.create({
    // Todo: change base to process.env
    baseURL: "https://starknet.api.avnu.fi/",
    // baseURL: "https://sepolia.api.avnu.fi/",
})



