import {api} from "../services/api.mjs";
import {STRK} from "../utils/constants.mjs"


function getAccount (provider, accountAddress, privateKey) {
    const account = new Account(provider, accountAddress, privateKey);
    return account
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


async function buildMessageTypedData (quoteID, takerAddress, maxGasTokenAmount) {
    const data = {
            quoteId: quoteID,
            takerAddress: takerAddress,
            slippage: 0.05,
            includeApprove: true,
            gasTokenAddress: STRK,
            maxGasTokenAmount: maxGasTokenAmount
        }
    try {
        const response = await api.buildTypedData(data)
        return response
      } catch (err) {
        console.error(err);
      }
}

async function getSignature (provider, accountAddress, privateKey,typedDataValidate) {
    let account = getAccount(provider, accountAddress, privateKey);
    const signature = await account.signMessage(typedDataValidate)
    console.log("signature", signature)
    return signature

}


async function execute (privateKey, sellTokenAddress, buyTokenAddress, sellAmount, takerAddress, maxGasTokenAmount) {
    let quoteID = await getQuoteData(sellTokenAddress, buyTokenAddress, sellAmount, takerAddress).quoteId;

    let typedData = await buildMessageTypedData(quoteID, takerAddress, maxGasTokenAmount)

    let sig = await getSignature(process.env.RPC_URL_TESTNET, takerAddress, privateKey, typedData)

    let data = {
        quoteId : quoteID,
        signature: sig
    }

    try {
        const response = await api.executeSwap(data)
        return response
    } catch (err) {
        console.error(err);
    }
    
}

async function getSupportedTokens () {
   try {
    let response = await api.getSupportedTokens()
    return response.data.content
   } catch (err) {
    console.error(err)
   }

}



export {
    execute,
    getAccount,
    getSupportedTokens
}