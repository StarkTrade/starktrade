import {InlineKeyboard} from "grammy";

export const buyOptions = new InlineKeyboard()
  .text("Buy with 100 STRK", "buy_100")
  .text("Buy with 500 STRK", "buy_500").row()
  .text("Buy with X STRK", "buy_x");








//   export async function tokensData() {

//     let tokens = await getAllTokenDetails("0x01e0eee22c684fdf32babdd65e6bcca62a8ce2c23c8d5e68f3989595d26e1b4a")
    
//     console.log("tokens Data", tokens)
// }

// tokensData()

