import { avnu, dexSc } from "./http.mjs"
export const api = {
    getQuote: async (data) => {
        return await avnu.get(`swap/v2/quotes?sellTokenAddress=${data.sellTokenAddress}&buyTokenAddress=${data.buyTokenAddress}&sellAmount=${data.sellAmount}&takerAddress=${data.takerAddress}`)
        },

    getSupportedTokens: async () => {
        return await avnu.get(`swap/v2/tokens`)
    },

    buildTypedData: async (data) => {
        return await avnu.post(`swap/v2/build-typed-data`, data)
    },

    executeSwap: async (data) => {
        return await avnu.post(`swap/v2/execute`, data)
    },

    getTokenPrice: async (data) => {
        return await avnu.get(`/swap/v2/prices?sellTokenAddress=${data.sellTokenAddress}&buyTokenAddress=${data.buyTokenAddress}&sellAmount=${data.sellAmount}`)
    },


    getTokenDetails: async (data) => {
        return await dexSc.get(`${data}`)
    },


    
}

