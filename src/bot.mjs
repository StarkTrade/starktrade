import {Bot, Keyboard} from "grammy";
import { homeOptions, sellOptions, walletOptions, settingOptions } from './utils/inlineButtons.mjs';
import { buyOptions } from "./trade/buy.mjs";
import { botCommands } from './utils/commands.mjs';

// const { homeOptions, buyOptions, sellOptions, walletOptions, settingOptions } = require("./utils/inlineButtons")

export const {
    // Telegram bot token from t.me/BotFather
    TELEGRAM_BOT_TOKEN: token,

    // Secret token to validate incoming updates
    TELEGRAM_SECRET_TOKEN: secretToken = String(token).split(":").pop()
    
} = process.env;

// Default grammY bot instance
export const bot = new Bot(token);

bot.api.setMyCommands(botCommands)

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
