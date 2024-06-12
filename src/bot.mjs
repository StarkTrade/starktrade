import {Bot, InlineKeyboard, Keyboard} from "grammy";

export const {

    // Telegram bot token from t.me/BotFather
    TELEGRAM_BOT_TOKEN: token,

    // Secret token to validate incoming updates
    TELEGRAM_SECRET_TOKEN: secretToken = String(token).split(":").pop()

} = process.env;

// Default grammY bot instance
export const bot = new Bot(token);

bot.api.setMyCommands([
    { command: "/home", description: "Stark Trade Home" },
    { command: "/settings", description: "Customize your bot" },
    { command: "/help", description: "Tips and frequently asked questions" },
    { command: "/chat", description: "Join out telegram community" },
])

const homeOptions = new InlineKeyboard()
  .text("Buy", "buy")
  .text("Sell", "sell").row()
  .text("Wallet", "wallet")
  .text("Settings", "settings").row()
  .text("Refresh", "refresh");

const buyOptions = new InlineKeyboard()
  .text("Buy 100 STRK", "buy_100")
  .text("Buy 500 STRK", "buy_500").row()
  .text("Buy X STRK", "buy_x");

const sellOptions = new InlineKeyboard()
  .text("Sell 25%", "sell_25")
  .text("Sell 50%", "sell_50").row()
  .text("Sell 75%", "sell_75")
  .text("Sell 100%", "sell_100").row()
  .text("Sell X", "sell_x");

const walletOptions = new InlineKeyboard()
  .text("Create Wallet", "create_wallet")
  .text("Import Wallet", "import_wallet");

const settingOptions = new InlineKeyboard()
  .text("Min Position Val", "min_position_val")
  .text("Buy Button Config", "buy_button_config").row()
  .text("Sell Button Config", "sell_button_config")
  .text("Slippage Config", "slippage_config").row()
  .text("Max Price Impact", "slippage_config");

// Sample handler for a simple echo bot
// bot.on("message:text", ctx => ctx.reply(ctx.msg.text));
// bot.on("message:text", ctx => ctx.reply(ctx.msg.text, {
//     reply_markup: inlineKeyboard,
// }));

bot.command("start", async (ctx) => {
    await ctx.reply("Start Trading on StarkNet! Import your existing wallet or create a new wallet to get started", { reply_markup: homeOptions });
});

bot.command("home", async (ctx) => {
    await ctx.reply("Start Trading on StarkNet! Import your existing wallet or create a new wallet to get started", { reply_markup: homeOptions });
});

bot.callbackQuery("buy", async (ctx) => {
    await ctx.reply("Buy Token:", { reply_markup: buyOptions });
});

bot.callbackQuery("sell", async (ctx) => {
    await ctx.reply("Sell Token:", { reply_markup: sellOptions });
});

bot.callbackQuery("wallet", async (ctx) => {
    await ctx.reply("Wallet", { reply_markup: walletOptions });
});

bot.callbackQuery("settings", async (ctx) => {
    await ctx.reply("Settings", { reply_markup: settingOptions });
});
