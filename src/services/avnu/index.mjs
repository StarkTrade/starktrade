import axios from "axios";

 const avnu = axios.create({
    // Todo: change base to process.env
    baseURL: "https://starknet.api.avnu.fi/",
})



const api = {
    getQuote: async (data) => {
        return await avnu.get(`swap/v2/quotes?sellTokenAddress=${data.sellTokenAddress}&buyTokenAddress=${data.buyTokenAddress}&sellAmount=${data.sellAmount}&takerAddress=${data.takerAddress}`)
        },

    buildTypedData: async (data) => {
        return await avnu.post(`swap/v2/build`, data)
    },

}




