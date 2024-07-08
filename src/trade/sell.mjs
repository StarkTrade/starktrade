import { tradeWithAvnu } from "../services/avnu/index.mjs";
import { getUserTokenBalance } from "../trade/helper.mjs";

export async function executeSell(accountAddress, privateKey, slippage, tokenInAddress, tokenOutAddress, sellPercent) {
    try {
        const userBalance = await getUserTokenBalance(accountAddress, tokenOutAddress);
        console.log("user balance",userBalance)

        const sellAmount = (sellPercent/100) * userBalance;
        console.log("Sell Amount", sellAmount);

        let data = await tradeWithAvnu(privateKey, accountAddress, tokenInAddress, tokenOutAddress, sellAmount, slippage);
        console.log(data);
    } catch (error) {
        console.error(error)
    }
}

export async function sellX(accountAddress, privateKey, slippage, tokenInAddress, tokenOutAddress, sellAmount) {
    try {
        const userBalance = await getUserTokenBalance(accountAddress, tokenOutAddress);
        console.log("user balance",userBalance)

        if(sellAmount > userBalance) {
            console.log("Insufficient balance")
        } else {
            let data = await tradeWithAvnu(privateKey, accountAddress, tokenInAddress, tokenOutAddress, sellAmount, slippage);
            console.log(data);
        }
    } catch (error) {
        console.error(error)
    }
}