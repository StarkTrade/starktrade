import { tradeWithAvnu } from "../services/avnu/index.mjs";
import { getUserTokenBalance } from "../trade/helper.mjs";

export async function executeSell(accountAddress, privateKey, slippage, tokenInAddress, tokenOutAddress, sellPercent) {
    const userBalance = await getUserTokenBalance(accountAddress, tokenInAddress);
    console.log("user balance",userBalance)

    const sellAmount = (sellPercent/100) * userBalance;
    console.log("Sell Amount", sellAmount);

    let data = await tradeWithAvnu(privateKey, accountAddress, tokenInAddress, tokenOutAddress, sellAmount, slippage);
    console.log(data);

    return data
}

export async function sellX(accountAddress, privateKey, slippage, tokenInAddress, tokenOutAddress, sellAmount) {
    let data = await tradeWithAvnu(privateKey, accountAddress, tokenInAddress, tokenOutAddress, sellAmount, slippage);
    console.log(data);

    return data
}