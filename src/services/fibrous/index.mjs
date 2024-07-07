import { Account, RpcProvider, Provider, constants } from "starknet";
import { ETH } from "../../utils/constants.mjs";
import { Router as FibrousRouter } from "fibrous-router-sdk";
import dotenv from 'dotenv';
dotenv.config();

const fibrous = new FibrousRouter();

export async function tradeWithFibrous (accountAddress, privateKey, slippage, inputAmount, tokenOutAddress) {
  try {
    
    const provider = new RpcProvider({ nodeUrl: process.env.RPC_URL_MAINNET }); 
  
    const account = new Account(provider, accountAddress, privateKey, "1");

    const approveCall = await fibrous.buildApprove(
      BigNumber.from(parseUnits(inputAmount)),
      tokenInAddress,
    );
  
    const swapCall = await fibrous.buildTransaction(
      BigNumber.from(parseUnits(inputAmount)),
      tokenInAddress,
      tokenOutAddress,
      slippage,
      accountAddress,
    );
  
    console.log("swapCall", swapCall);
  
  return await account.execute([approveCall, swapCall])
  } catch (error) {
    console.error(error)
  }  
}