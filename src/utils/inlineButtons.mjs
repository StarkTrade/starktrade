import {InlineKeyboard} from "grammy";

const homeOptions = new InlineKeyboard()
  .text("Buy", "buy")
  .text("Sell", "sell").row()
  .text("Wallet", "wallet")
  .text("Settings", "settings").row()
  .text("Refresh", "refresh");

const walletOptions = new InlineKeyboard()
  .text("Create Wallet", "create_wallet")
  .text("Import Wallet", "import_wallet");

const settingOptions = new InlineKeyboard()
  .text("Min Position Val", "min_position_val")
  .text("Buy Button Config", "buy_button_config").row()
  .text("Sell Button Config", "sell_button_config")
  .text("Slippage Config", "slippage_config").row()
  .text("Max Price Impact", "slippage_config");

export {
    homeOptions,
    walletOptions,
    settingOptions,
};