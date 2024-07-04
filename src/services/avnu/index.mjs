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


async function getQuoteData (sellTokenAddress, buyTokenAddress, sellAmount, takerAddress ) {
    const data = {
        sellTokenAddress: sellTokenAddress,
        buyTokenAddress: buyTokenAddress,
        sellAmount: sellAmount,
        takerAddress: takerAddress
    }
    try {
      const response = await api.getQuote(data)
      return response
    } catch (err) {
      console.error(err);
    }
  };


async function buildCallData (quoteID, takerAddress, slippage) {

    const data = {
        quoteId: quoteID,
        takerAddress: takerAddress,
        slippage: slippage,
        includeApprove: true
        }
    try {
        const response = await api.buildTypedData(data)
        return response
      } catch (err) {
        console.error(err);
      }
}

async function callData (sellTokenAddress, buyTokenAddress, sellAmount, takerAddress, slippage ) {
    try {
        
        const {data} = await getQuoteData(sellTokenAddress, buyTokenAddress, sellAmount, takerAddress);
        const quoteId = data[0].quoteId;

        const callData = await buildCallData(quoteId, takerAddress, slippage);
        return callData;

    } catch (error) {
        console.log(error)
    }
}


