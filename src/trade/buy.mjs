import {bot} from "../bot.mjs"
import { VALIDATE } from "../utils/constants.mjs";
import {InlineKeyboard} from "grammy";
import {getSupportedTokens} from "../trade/helper.mjs"




export const buyOptions = new InlineKeyboard()
  .text("Buy with 100 STRK", "buy_100")
  .text("Buy with 500 STRK", "buy_500").row()
  .text("Buy with X STRK", "buy_x");

  export async function tokens() {

    let tokens = await getSupportedTokens()
    
    console.log("tokens", tokens)
}

tokens()

