import {Bot, Keyboard} from "grammy";
import { homeOptions, walletOptions, settingOptions } from './utils/inlineButtons.mjs';
import { buyOptions } from "./trade/buy.mjs";
import { sellOptions } from "./trade/sell.mjs";
import { botCommands } from './utils/commands.mjs';
import { getSupportedTokens, getAllTokenDetails } from "./trade/helper.mjs";
import { VALIDATE } from "./utils/constants.mjs";

// const { homeOptions, buyOptions, sellOptions, walletOptions, settingOptions } = require("./utils/inlineButtons")

export const {
    // Telegram bot token from t.me/BotFather
    TELEGRAM_BOT_TOKEN: token,

    // Secret token to validate incoming updates
    TELEGRAM_SECRET_TOKEN: secretToken = String(token).split(":").pop()
    
} = process.env;

// Default grammY bot instances
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

    if (address.startsWith('0x') && (address.length === 64 || address.length === 66)) {
        const tokenData = await getAllTokenDetails(address);

        console.log("tokenData", tokenData)

        if (tokenData ) {

            console.log(tokenData, "tokenData")
            const  {
                tokenName,
                tokenSymbol,
                tokenAddress,
                tokenPrice,
                tokenPriceChange: { m5, h1, h6, h24 },
                liquidity,
                fdv,
                websites,
                viewChart
            } = tokenData;
         
            await ctx.reply(`${tokenSymbol} | ${tokenName} | [${tokenAddress}](https://starkscan.co/token/${tokenAddress}) \nm5: ${m5}% | h1: ${h1}% | h6: ${h6}% | h24: ${h24}%
            \n*Price: $${tokenPrice}*  \n*Market Cap / fdv: $${fdv}*   \n*Liquidity: $${liquidity}* 
            \n[Website](${websites})   \n[View Chart](${viewChart})
            \nWallet Balance: *0*. \nTo buy press one of the buttons below. `, { reply_markup: buyOptions , parse_mode: 'Markdown',  disable_web_page_preview: true });
        }else {
            await ctx.reply(`Token not found. Make sure address ${ctx.message.text} is correct. \nYou can enter a ticker or contract address, or check starkScan. If you are trying to enter a buy or sell amount, ensure you click and reply to the message`, { reply_markup: homeOptions });
        }

    } else {
        await ctx.reply("I do not understand your input text please go back to /home")
    }
     
})


