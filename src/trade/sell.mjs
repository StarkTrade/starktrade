import {InlineKeyboard} from "grammy";

export const sellOptions = new InlineKeyboard()
  .text("Sell 25%", "sell_25")
  .text("Sell 50%", "sell_50").row()
  .text("Sell 75%", "sell_75")
  .text("Sell 100%", "sell_100").row()
  .text("Sell X", "sell_x");
