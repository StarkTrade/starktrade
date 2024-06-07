import {Bot} from "grammy";

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

// Sample handler for a simple echo bot
bot.on("message:text", ctx => ctx.reply(ctx.msg.text));
