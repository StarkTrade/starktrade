import CryptoJS from "crypto-js";

export const StarkTradeStorage = () => {
    return {
        secretKey: null,
        accountAddress: null,
        balance: 0,
        walletRequested: false,
        slippage: 0.01,
        tokenAddress: null,
        sellInit: false
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