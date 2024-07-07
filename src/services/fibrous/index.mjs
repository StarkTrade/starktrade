import { Account, RpcProvider, Provider, constants } from "starknet";
import { STRK } from "../../utils/constants.mjs";
import { Router as FibrousRouter } from "fibrous-router-sdk";
import dotenv from 'dotenv';
dotenv.config();

const fibrous = new FibrousRouter();

export async function buyWithFibrous (accountAddress, privateKey, slippage, inputAmount, tokenOutAddress) {

    const provider = new RpcProvider({ nodeUrl: process.env.RPC_URL_MAINNET });
  
    const account = new Account(provider, accountAddress, privateKey, "1");
  
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