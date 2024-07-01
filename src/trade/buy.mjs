import {InlineKeyboard} from "grammy";
import { Account, RpcProvider } from "starknet";
import { STRK } from "../utils/constants.mjs";

export const buyOptions = new InlineKeyboard()
  .text("Buy with 100 STRK", "buy_100")
  .text("Buy with 500 STRK", "buy_500").row()
  .text("Buy with X STRK", "buy_x");



export async function executeBuy (accountAddress, privateKey, slippage, inputAmount, tokenOutAddress) {

  const provider = new RpcProvider({ nodeUrl: process.env.RPC_URL_TESTNET }); 

  const account = new Account(provider, accountAddress, privateKey);

  const approveCall = await fibrous.buildApprove(
    inputAmount,
    STRK,
  );

  const swapCall = await fibrous.buildTransaction(
    inputAmount,
    STRK,
    tokenOutAddress,
    slippage,
    accountAddress,
  );

  await account.execute([approveCall, swapCall])
}


