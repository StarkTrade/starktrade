import { dexScreenerService } from "../services/dexscreener/index.mjs";
import {STRK} from "../utils/constants.mjs"
import { Account } from "starknet";
import { Router as FibrousRouter } from "fibrous-router-sdk";

const fibrous = new FibrousRouter();


function getAccount (provider, accountAddress, privateKey) {
    const account = new Account(provider, accountAddress, privateKey);
    return account
}


async function getAllTokenDetails (tokenAddress) {
    try {
    
        let {data} = await dexScreenerService.getTokenDetails(tokenAddress)
        if (data) {
            console.log(data, "length")
            if (data?.pairs?.length > 0) {
        
                let res = data.pairs[0]
                console.log("First pair", res)
                return {
                    tokenName: res.baseToken.name,
                    tokenSymbol: res.baseToken.symbol,
                    tokenAddress: res.baseToken.address,
                    tokenPrice: res.priceUsd,
                    tokenPriceChange: {
                        m5: res.priceChange.m5,
                        h1: res.priceChange.h1 ,
                        h6: res.priceChange.h6 ,
                        h24: res.priceChange.h24},
                    liquidity: res.liquidity.usd ,
                    fdv: res.fdv,
                    websites: res.hasOwnProperty("websites") ? res.info.websites[0].url : "https://starkscan.co/token/" + tokenAddress, 
                    viewChart: res.url,
                    status: true,
                }
            } else {
                return false
            }
        }
      
    } catch (err) {
        console.error(err)
    }
}


export {
    getAccount,
    getAllTokenDetails
}