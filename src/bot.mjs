import { Bot, Keyboard, session } from "grammy";
import { homeOptions, walletOptions, settingOptions } from './utils/inlineButtons.mjs';
import { buyOptions } from "./trade/buy.mjs";
import { sellOptions } from "./trade/sell.mjs";
import { botCommands } from './utils/commands.mjs';
import { getAllTokenDetails } from "./trade/helper.mjs";
import { StarkTradeStorage, sessionkey, sessionChecker, encrypt, decrypt } from "./utils/storage.mjs";
import { getAccountFromPrivateKey, createArgentAccount, deployArgentAccount } from "./utils/wallet.mjs";
import { executeBuy } from "./trade/buy.mjs";
import { ETH } from "./utils/constants.mjs";

import dotenv from 'dotenv';
dotenv.config();


export const {
    // Telegram bot token from t.me/BotFather
    TELEGRAM_BOT_TOKEN: token,

    // Secret token to validate incoming updates
    TELEGRAM_SECRET_TOKEN: secretToken = String(token).split(":").pop()
} = process.env;

// Default grammY bot instances
export const bot = new Bot(token);

/*====================================================
=============== Bot Storage Initializer ==============
======================================================
*/
bot.use(session({
    initial: StarkTradeStorage,
    getSessionKey: sessionkey
}));

/*****************************************************/


bot.command("test", async (ctx) => {
    const { count } = ctx.session;
    ctx.session.count = count + 1;

    await ctx.reply("ctx.session.count: " +ctx.session.count);
})

/*====================================================
================== Bot Menu Handler ==================
======================================================
*/

bot.api.setMyCommands(botCommands)

/*****************************************************/

/*====================================================
================== Bot Command Handler ===============
======================================================
*/




bot.command("start", async (ctx) => {
    if(sessionChecker(ctx)) {
        await ctx.reply(`Welcome to StarkTrade. 
            \nThe fastest bot on Starknet for trading any coin!
            \nAfter completing your transaction, simply tap refresh to see your updated balance.
            \nTo purchase a token, enter the token address.
            \nFor more information about your wallet and to retrieve your private key, tap the wallet button below. Rest assured, your funds are safe with StarkTrade. However, please remember to keep your private key secure, as we cannot protect you if it is exposed.
            \nHappy Trading!`, { reply_markup: homeOptions });
    } else {
        await ctx.reply("Start Trading on StarkNet! *Import your existing wallet or Create a new wallet to get started*", { reply_markup: walletOptions, parse_mode: 'Markdown' });
    }
});

bot.command("home", async (ctx) => {
    if(sessionChecker(ctx)) {
        await ctx.reply(`Welcome to StarkTrade. 
            \nThe fastest bot on Starknet for trading any coin!
            \nAfter completing your transaction, simply tap refresh to see your updated balance.
            \nTo purchase a token, enter the token address.
            \nFor more information about your wallet and to retrieve your private key, tap the wallet button below. Rest assured, your funds are safe with StarkTrade. However, please remember to keep your private key secure, as we cannot protect you if it is exposed.
            \nHappy Trading!`, { reply_markup: homeOptions });
    } else {
        await ctx.reply("Start Trading on StarkNet! *Import your existing wallet or Create a new wallet to get started*", { reply_markup: walletOptions, parse_mode: 'Markdown' });
    }
});

/*====================================================
================ Bot Callback Handler ================
======================================================
*/

bot.callbackQuery("buy", async (ctx) => {
    await ctx.reply(`Buy Token:
    \nInput contract address of token to buy`);
});

bot.callbackQuery("sell", async (ctx) => {
    await ctx.reply("Sell Token:", { reply_markup: sellOptions });
});

bot.callbackQuery("wallet", async (ctx) => {
    await ctx.reply("Please Create or Import an existing StarkNet Wallet", { reply_markup: walletOptions });
});

bot.callbackQuery("settings", async (ctx) => {
    await ctx.reply("Settings", { reply_markup: settingOptions });
});

bot.callbackQuery("create_wallet", async (ctx) => {
    ctx.session.secretKey = encrypt(createArgentAccount().privateKey, token)
    ctx.session.accountAddress = getAccountFromPrivateKey(decrypt(ctx.session.secretKey, token))
    ctx.session.walletRequested = false

    await ctx.reply(`Your Starknet Wallet Address is [${ctx.session.accountAddress}](https://starkscan.co/contract/${ctx.session.accountAddress}).
        \nPrivate Key: ${decrypt(ctx.session.secretKey, token)}
        \n_Ensure you keep your private key safe, as we cannot protect you if it is exposed_.
        \nNow, deposit funds and enjoy Starktrade seamless trading experience.`, {
            reply_markup: homeOptions,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
        });
})

bot.callbackQuery("import_wallet", async (ctx) => {
    const { secretKey } = ctx.session
    ctx.session.walletRequested = true
    await ctx.reply("*Please Input your Private Key:*", {parse_mode: 'Markdown'});
})


bot.callbackQuery("buy_min", async (ctx) => {
    const { 
        secretKey, 
        accountAddres, 
        balance,  
        slippage, 
        buy_with_min_eth,
        tokenOutAddress
    } = ctx.session 

    if (balance < buy_with_min_eth) {
        await ctx.reply(`Insufficient balance. Your balance is ${balance} ETH. Transfer ETH into your wallet to continue`, { reply_markup: buyOptions(ctx) });
    } else {
        let buy = await executeBuy(secretKey, accountAddres, ETH, tokenOutAddress, buy_with_min_eth, slippage)
    }
})


/*====================================================
================ Bot Listener Handler ================
======================================================
*/
bot.hears(/^(0x){1}[0-9a-fA-F]{40,70}$/i, async (ctx) => {
    const input = ctx.match[0]
    const { walletRequested } = ctx.session
    const tokenData = await getAllTokenDetails(input);

    if (walletRequested) {
        ctx.session.secretKey = encrypt(input, token)
        ctx.session.accountAddress = getAccountFromPrivateKey(input)
        ctx.session.walletRequested = false

        await ctx.reply(`Your Starknet Wallet Address is [${ctx.session.accountAddress}](https://starkscan.co/contract/${ctx.session.accountAddress}).
            \n_Ensure you keep your private key safe, as we cannot protect you if it is exposed_.
            \nNow, deposit funds and enjoy Starktrade seamless trading experience.`, {
                reply_markup: homeOptions,
                parse_mode: 'Markdown',
                disable_web_page_preview: true
            });
    } else {
        // console.log("tokenData", tokenData)
        if (tokenData ) {
            ctx.session.tokenOutAddress = tokenData?.tokenAddress
    
            console.log("Our stored address :", ctx.session.tokenOutAddress)

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
            \nWallet Balance: *0*. \nTo buy press one of the buttons below. `, { reply_markup: buyOptions(ctx) , parse_mode: 'Markdown',  disable_web_page_preview: true });
        }else {
            await ctx.reply(`Token not found. Make sure address *${ctx.message.text}* is a valid starknet token address correct.
                \nIf you are trying to enter a buy or sell amount, ensure you click and reply to the message`,
                { reply_markup: homeOptions, parse_mode: 'Markdown' }
            );
        }
    }
});



// console.log(getAccountFromPrivateKey(String("0x0123")), "address")

// console.log(createArgentAccount());

