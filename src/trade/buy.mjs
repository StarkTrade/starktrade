import {InlineKeyboard} from "grammy";
import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "ethers";
import { buyWithFibrous } from "../services/fibrous/index.mjs";


export const buyOptions = new InlineKeyboard()
  .text("Buy with 100 STRK", "buy_100")
  .text("Buy with 500 STRK", "buy_500").row()
  .text("Buy with X STRK", "buy_x");



export async function executeBuy (accountAddress, privateKey, slippage, inputAmount, tokenOutAddress) {
  buyWithFibrous(accountAddress, privateKey, slippage, inputAmount, tokenOutAddress);
}


// async function testBuy() {
//   try {
//     await executeBuy(
//     "0x024De3eddBb15440e52b7f1D78AE69C3f429B7F9f71d0671A12De613f59398DD",
//     "0x04ebf4598bc515b106c64a6e0c5a6c5476ece0f4b321eabeb402f9bedf7e1d9f",
//     0.05,
//     BigNumber.from(parseUnits("1", 18)),
//     "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
//   )
//   } catch (error) {
//     console.log(error)
//   }
// }

// testBuy()


