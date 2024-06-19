import api from "../services/api.mjs";
import {STRK} from "../utils/constants.mjs"


export const buyOptions = new InlineKeyboard()
  .text("Buy 100 STRK", "buy_100")
  .text("Buy 500 STRK", "buy_500").row()
  .text("Buy X STRK", "buy_x");

function getAccount (provider, accountAddress, privateKey) {
    const account = new Account(provider, accountAddress, privateKey);
    return account
}


async function getQuoteData (buyTokenAddress, sellAmount, takerAddress ) {
    const data = {
        sellTokenAddress: STRK,
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
    const signature = (await account.signMessage(typedDataValidate))
    return signature

}


async function executeBuy (privateKey, buyTokenAddress, sellAmount, takerAddress, maxGasTokenAmount) {
    let quoteID = await getQuoteData(buyTokenAddress, sellAmount, takerAddress).quoteId;

    let typedData = await buildMessageTypedData(quoteID, takerAddress, maxGasTokenAmount)

    let sig = await getSignature(process.env.RPC_URL_TESTNET, takerAddress, privateKey, typedData)

    let data = {
        quoteId : quoteID,
        signature: [sig]
    }

    try {
        const response = await api.executeSwap(data)
        return response
    } catch (err) {
        console.error(err);
    }
    
}