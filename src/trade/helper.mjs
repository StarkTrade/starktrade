import { blastService } from "../services/blast/index.mjs";
import { dexScreenerService } from "../services/dexscreener/index.mjs";
import { RpcProvider, Contract } from "starknet";
import dotenv from 'dotenv';
dotenv.config();

const padWithZero = (address) => {
    return `${address.slice(0,2)}0${address.slice(2)}`
}

async function getAllTokenDetails (tokenAddress) {
    try {
    
        let {data} = await dexScreenerService.getTokenDetails(tokenAddress)
        if (data) {
            if (data?.pairs?.length > 0) {
        
                let res = data.pairs[0]
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

async function getUserTokenBalance(userAddress, tokenAddress) {
    const provider = new RpcProvider({ nodeUrl: process.env.RPC_URL_MAINNET });
    const { abi } = await provider.getClassAt(tokenAddress)
    const tokenContract = new Contract(abi, tokenAddress, provider)

    const balance = parseInt(await tokenContract.balanceOf(userAddress))
    const decimals = parseInt(await tokenContract.decimals())

    return (balance / 10**decimals).toFixed(2)
}

async function getAllTokenBalances(userAddress) {
    const data = await blastService.getWalletTokenBalances(userAddress)

    const tokenLists = data?.reduce((acc, currentValue) => {
        const { balance, contractDecimals } = currentValue

        const tokenBalance = {
            balance: parseInt(balance) / 10 ** parseInt(contractDecimals)
        }

        acc?.push({...currentValue, ...tokenBalance})

        return acc
    }, [])

    return tokenLists
}

export {
    padWithZero,
    getAllTokenDetails,
    getUserTokenBalance,
    getAllTokenBalances
}