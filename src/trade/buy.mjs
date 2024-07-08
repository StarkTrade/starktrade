import {InlineKeyboard} from "grammy";
import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "ethers";
import { tradeWithFibrous } from "../services/fibrous/index.mjs";
import { tradeWithAvnu } from "../services/avnu/index.mjs";


export const buyOptions = (ctx) => {

  const { buy_with_min_eth, buy_with_max_eth } = ctx.session
  
  return new InlineKeyboard()
    .text(`Buy with ${buy_with_min_eth} ETH`, "buy_min")
    .text(`Buy with ${buy_with_max_eth} ETH`, "buy_max").row()
    .text(`Buy with X ETH`, "buy_x");
}


export async function executeBuy (privateKey, accountAddress, tokenInAddress, tokenOutAddress, inputAmount, slippage) {
    
    let data = await tradeWithAvnu(privateKey, accountAddress, tokenInAddress, tokenOutAddress, inputAmount, slippage);

    if (!data) {
      
      data = await tradeWithFibrous(accountAddress, privateKey, slippage, inputAmount, tokenInAddress, tokenOutAddress);

    }

    return data
}


