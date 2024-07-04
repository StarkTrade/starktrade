import { blastService } from "../services/blast/index.mjs";
import { dexScreenerService } from "../services/dexscreener/index.mjs";
import { Account } from "starknet";


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

async function getUserTokenBalance(userAddress, tokenAddress) {
    const { abi } = await provider.getClassAt(tokenAddress)
    const tokenContract = new Contract(abi, tokenAddress, provider)

    const balance = parseInt(await tokenContract.balanceOf(userAddress))
    const decimals = parseInt(await tokenContract.decimals())

    console.log(balance / 10 ** decimals, 'balance');
    return balance / decimals
}

async function getAllTokenBalances(userAddress) {
    const data = await blastService.getWalletTokenBalances(userAddress)

    const tokenLists = data?.reduce((acc, currentValue) => {
        const { balance, contractDecimals } = currentValue

        console.log(balance, contractDecimals, 'balance');
        const tokenBalance = {
            balance: parseInt(balance) / 10 ** parseInt(contractDecimals)
        }

        console.log(tokenBalance, 'tokenBalance');
        acc?.push({...currentValue, ...tokenBalance})

        return acc
    }, [])

    console.log(tokenLists, "tokenLists");

    return tokenLists
}

getAllTokenBalances("0x024De3eddBb15440e52b7f1D78AE69C3f429B7F9f71d0671A12De613f59398DD")


export {
    getAccount,
    getAllTokenDetails,
    getUserTokenBalance
}