import { Account, RpcProvider, Provider, constants } from "starknet";
import { STRK } from "../../utils/constants.mjs";
import { Router as FibrousRouter } from "fibrous-router-sdk";

const fibrous = new FibrousRouter();

export async function buyWithFibrous (accountAddress, privateKey, slippage, inputAmount, tokenOutAddress) {

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