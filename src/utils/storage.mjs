import CryptoJS from "crypto-js";

export const StarkTradeStorage = () => {
    return {
        secretKey: null,
        accountAddress: null,
        balance: 0,
        walletRequested: false,
        slippage: 0.01,
        tokenOutAddress: null,
        buy_with_min_eth: 0.005,
        buy_with_max_eth: 1,
        tradeInitiated: false
    }
}

export const sessionkey = (ctx) => {
    return ctx.from?.id.toString()
}


export const encrypt = (text, token) => {
    return CryptoJS.AES.encrypt(text, token).toString();
}

export const decrypt = (text, token) => {
    return CryptoJS.AES.decrypt(text, token).toString(CryptoJS.enc.Utf8);
}

export const sessionChecker = (ctx) => {
    const { secretKey } = ctx.session

    if (!secretKey) {
        return false
    }
    return true
}