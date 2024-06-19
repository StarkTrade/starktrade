import { http } from "./http.mjs"
export const api = {
    getQuote: async (data) => {
        return await http.get(`swap/v2/quotes?sellTokenAddress=${data.sellTokenAddress}&buyTokenAddress=${data.buyTokenAddress}&sellAmount=${data.sellAmount}&takerAddress=${data.takerAddress}`)
        },

    getSupportedTokens: async () => {
        return await http.get(`swap/v2/tokens`)
    },

    buildTypedData: async (data) => {
        return await http.post(`swap/v2/build-typed-data`, data)
    },

    executeSwap: async (data) => {
        return await http.post(`swap/v2/execute`, data)
    },



    
}

