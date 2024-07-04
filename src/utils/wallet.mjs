import {ec, stark, hash, CallData } from "starknet"
import { argentAccountClassHash } from "./constants.mjs";

export const getAccountFromPrivateKey = (privateKey) => {
    const starkPublicKey = ec.starkCurve.getStarkKey(privateKey);

    const AConstructCalldata = CallData.compile({
        owner: starkPublicKey,
        guardian: '0',
    })

    const AContractAddress = hash.calculateContractAddressFromHash(
        starkPublicKey,
        argentAccountClassHash,
        AConstructCalldata,
        0
    );
    return AContractAddress
}

export const createArgentAccount = () => {
    const privateKeyAX = stark.randomAddress();

    const starkKeyPubAX = ec.starkCurve.getStarkKey(privateKeyAX);

    const AXConstructorCallData = CallData.compile({
        owner: starkKeyPubAX,
        guardian: '0',
    });

    const ArgentAccountAddress = hash.calculateContractAddressFromHash(
    starkKeyPubAX,
    argentAccountClassHash,
    AXConstructorCallData,
    0
    );

    const argentAccountDetails = {
        privateKey: privateKeyAX,
        account: ArgentAccountAddress
    }

    return argentAccountDetails
}

export const deployArgentAccount = async (privateKey, ArgentAccountAddress) => {
    const provider = new RpcProvider({ nodeUrl: process.env.RPC_URL_MAINNET });

    const starkKeyPubAX = ec.starkCurve.getStarkKey(privateKey);

    const AXConstructorCallData = CallData.compile({
        owner: starkKeyPubAX,
        guardian: '0',
    });

    const accountAX = new Account(provider, ArgentAccountAddress, privateKeyAX);

    const deployAccountPayload = {
        classHash: argentAccountClassHash,
        constructorCalldata: AXConstructorCallData,
        contractAddress: ArgentAccountAddress,
        addressSalt: starkKeyPubAX,
    };

    const { transaction_hash: AXdAth, contract_address: AXcontractFinalAddress } = await accountAX.deployAccount(deployAccountPayload);

    console.log('✅ ArgentX wallet deployed at:', AXcontractFinalAddress);
}