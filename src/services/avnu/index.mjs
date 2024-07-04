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



export async function buyWithAvnu (privateKey, accountAddress, buyTokenAddress, sellAmount, takerAddress, slippage) {

    try {
        const provider = new RpcProvider({ nodeUrl: process.env.RPC_URL_MAINNET });
      
        const account = new Account(provider, accountAddress, privateKey, "1");

        const {data} = await callData(STRK, buyTokenAddress, sellAmount, takerAddress, slippage)

        const callData = data.calls

        await account.execute(callData)
    } catch (error) {
        console.log(error)
    }
}


async function testExecute() {
    try {
      const executeData = await callData(
        "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
        "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        "0xDE0B6B3A7640000",
        "0x024De3eddBb15440e52b7f1D78AE69C3f429B7F9f71d0671A12De613f59398DD",
        0.05
      )
  
      console.log("execute", executeData.data)
    } catch (error) {
      console.log(error)
    }
  }

  testExecute()
