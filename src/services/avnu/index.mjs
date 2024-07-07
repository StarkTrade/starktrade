import axios from "axios";
import { Account, RpcProvider, Provider, constants } from "starknet";
import { STRK } from "../../utils/constants.mjs";
import dotenv from 'dotenv';
dotenv.config();


 const avnu = axios.create({
    baseURL: process.env.AVNU_BASE_URL,
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

export async function callData (sellTokenAddress, buyTokenAddress, sellAmount, takerAddress, slippage ) {
    try {
        
        const amount = Nuber(sellAmount.toString(16));
        const {data} = await getQuoteData(sellTokenAddress, buyTokenAddress, amount, takerAddress);
        const quoteId = data[0].quoteId;

        const callData = await buildCallData(quoteId, takerAddress, slippage);
        return callData;

    } catch (error) {
        console.log(error)
    }
}



export async function tradeWithAvnu (privateKey, accountAddress, sellTokenAddress, buyTokenAddress, sellAmount, slippage) {

    try {
        const provider = new RpcProvider({ nodeUrl: process.env.RPC_URL_MAINNET });
      
        const account = new Account(provider, accountAddress, privateKey, "1");

        const {data} = await callData(sellTokenAddress, buyTokenAddress, sellAmount, accountAddress, slippage)

        console.log("Avnu data", data)

        const res = await account.execute(data.calls)

        console.log("res", res)
        return res;
    } catch (error) {
        console.log("error here",error)
    }
}
