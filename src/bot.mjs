import {Bot, Keyboard} from "grammy";
import { homeOptions, walletOptions, settingOptions } from './utils/inlineButtons.mjs';
import { buyOptions } from "./trade/buy.mjs";
import { sellOptions } from "./trade/sell.mjs";
import { botCommands } from './utils/commands.mjs';
import { getSupportedTokens } from "./trade/helper.mjs";
import { VALIDATE } from "./utils/constants.mjs";

// const { homeOptions, buyOptions, sellOptions, walletOptions, settingOptions } = require("./utils/inlineButtons")

export const {
    // Telegram bot token from t.me/BotFather
    TELEGRAM_BOT_TOKEN: token,

    // Secret token to validate incoming updates
    TELEGRAM_SECRET_TOKEN: secretToken = String(token).split(":").pop()
    
} = process.env;

// Default grammY bot instance
export const bot = new Bot(TELEGRAM_BOT_TOKEN);



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
    await ctx.reply(`Welcome to StarkTrade. 
    \nThe fastest bot on Starknet for trading any coin!
    \nAfter completing your transaction, simply tap refresh to see your updated balance.
    \nTo purchase a token, enter the token address.
    \nFor more information about your wallet and to retrieve your private key, tap the wallet button below. Rest assured, your funds are safe with StarkTrade. However, please remember to keep your private key secure, as we cannot protect you if it is exposed.
    \nHappy Trading!`, { reply_markup: homeOptions });
});

bot.callbackQuery("buy", async (ctx) => {
    await ctx.reply(`Buy Token:
    \nInput contract address of token to buy`);
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


bot.on("message:text", async (ctx) => {

    let address = ctx.message.text

    if (address.startsWith('0x') && address.length === 64) {
        const tokens = await getSupportedTokens()


        let tokenName;
        let tokenSymbol;
        let tokenDecimal;
        let tokenAddress;

        const token = tokens.map(token => {
            if (token.address === ctx.message.text) {
                tokenName = token.name
                tokenSymbol = token.symbol
                tokenDecimal = token.decimals
                tokenAddress = token.address
                return true
            } else {
                return false
            }
        })

        if (token) {
            await ctx.reply(`${tokenSymbol} | ${tokenName} | \n${tokenAddress} 
            \nPrice: $0.01
            \nMarket: $15 million 

            \nWallet Balance: 0. \nTo buy press one of the buttons below. `, { reply_markup: buyOptions });
        } else {
            await ctx.reply(`Token not found. Make sure address ${ctx.message.text} is correct. \nYou can enter a ticker or contract address, or check starkScan. If you are trying to enter a buy or sell amount, ensure you click and reply to the message`, { reply_markup: homeOptions });
        }

    } else {
        await ctx.reply("I do not understand your imput text please go back to /home")
    }
     
})


