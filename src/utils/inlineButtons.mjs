import {InlineKeyboard} from "grammy";

const homeOptions = new InlineKeyboard()
  .text("Buy", "buy")
  .text("Sell", "sell").row()
  .text("Wallet", "wallet")
  .text("Settings", "settings").row()
  .text("Portfolio", "portfolio");


const walletOptionBefore = new InlineKeyboard()
  .text("Create Account", "create_wallet")
  .text("Import Account", "import_wallet");

const walletOptions = new InlineKeyboard()
  .text("Create Account", "create_wallet")
  .text("Import Account", "import_wallet").row()
  .text("View Account", "view_wallet");

const settingOptions = new InlineKeyboard()
  .text("Min Position Val", "min_position_val")
  .text("Buy Button Config", "buy_button_config").row()
  .text("Sell Button Config", "sell_button_config")
  .text("Slippage Config", "slippage_config").row()
  .text("Max Price Impact", "slippage_config");

export {
    homeOptions,
    walletOptionBefore,
    walletOptions,
    settingOptions,
};