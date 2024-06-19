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


