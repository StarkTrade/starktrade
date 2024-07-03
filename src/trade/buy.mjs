import {InlineKeyboard} from "grammy";
import { Account, RpcProvider, Provider, constants } from "starknet";
import { STRK } from "../utils/constants.mjs";
import { Router as FibrousRouter } from "fibrous-router-sdk";
import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "ethers";

const fibrous = new FibrousRouter();

export const buyOptions = new InlineKeyboard()
  .text("Buy with 100 STRK", "buy_100")
  .text("Buy with 500 STRK", "buy_500").row()
  .text("Buy with X STRK", "buy_x");



export async function executeBuy (accountAddress, privateKey, slippage, inputAmount, tokenOutAddress) {

  const provider = new RpcProvider({ nodeUrl: 'https://starknet-mainnet.public.blastapi.io/rpc/v0_7' });

  console.log(provider, "provider")

  const account = new Account(provider, accountAddress, privateKey, "1");

  const approveCall = await fibrous.buildApprove(
    inputAmount,
    STRK,
  );

  console.log("approveCall", approveCall);

  const swapCall = await fibrous.buildTransaction(
    inputAmount,
    STRK,
    tokenOutAddress,
    slippage,
    accountAddress,
  );

  console.log("swapCall", swapCall);

  await account.execute([approveCall, swapCall])
}


async function testBuy() {
  try {
    await executeBuy(
    "0x024De3eddBb15440e52b7f1D78AE69C3f429B7F9f71d0671A12De613f59398DD",
    "0x04ebf4598bc515b106c64a6e0c5a6c5476ece0f4b321eabeb402f9bedf7e1d9f",
    0.05,
    BigNumber.from(parseUnits("1", 18)),
    "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
  )
  } catch (error) {
    console.log(error)
  }
}

testBuy()


