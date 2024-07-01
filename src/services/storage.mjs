import CryptoJS from "crypto-js";
import { CallData, ec, encode, hash, stark } from "starknet"
import { argentAccountClassHash } from "../utils/constants.mjs";

export const StarkTradeStorage = () => {
    return {
        secretKey: null,
        accountAddress: null,
        balance: 0,
        walletRequested: false,
        slippage: 0.01,
        tokenOutAddress: null
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

export const generateAccount = (privateKey) => {
    const starkPublicKey = ec.starkCurve.getStarkKey(privateKey);

    const AConstructCalldata = CallData.compile({
        owner: starkPublicKey,
        guardian: '0',
    })

    const AContractAddress = hash.calculateContractAddressFromHash(
        starkPublicKey,
        argentAccountClassHash,
        AConstructCalldata,
        0
    );
    return AContractAddress
}