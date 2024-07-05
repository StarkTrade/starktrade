import {InlineKeyboard} from "grammy";
import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "ethers";
import { tradeWithFibrous } from "../services/fibrous/index.mjs";
import { tradeWithAvnu } from "../services/avnu/index.mjs";


export const buyOptions = new InlineKeyboard()
  .text("Buy with 100 STRK", "buy_100")
  .text("Buy with 500 STRK", "buy_500").row()
  .text("Buy with X STRK", "buy_x");



export async function executeBuy (accountAddress, privateKey, slippage, inputAmount, tokenInAddress, tokenOutAddress) {
  tradeWithFibrous(accountAddress, privateKey, slippage, inputAmount, tokenInAddress, tokenOutAddress);
}


