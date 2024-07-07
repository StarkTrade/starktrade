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
      
      let res = await tradeWithFibrous(accountAddress, privateKey, slippage, inputAmount, tokenInAddress, tokenOutAddress);
      
      if (!res) {

        return "Service request too High at the moment. Please try again later."
      }

    }
}


async function testExecute() {
  try {


    const trade = await executeBuy(
      "0x04ebf4598bc515b106c64a6e0c5a6c5476ece0f4b321eabeb402f9bedf7e1d9f",
      "0x024De3eddBb15440e52b7f1D78AE69C3f429B7F9f71d0671A12De613f59398DD",
      "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
      // "0xDE0B6B3A7640000",
      "1",
      // BigNumber.from(parseUnits("1")),
      0.05
    )

    console.log("execute", trade)
  } catch (error) {
    console.log("other error",error)
  }
}

// testExecute()
