import {ec, stark, hash, CallData } from "starknet"
import { argentAccountClassHash } from "../utils/constants.mjs";

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

    const AXcontractAddress = hash.calculateContractAddressFromHash(
    starkKeyPubAX,
    argentAccountClassHash,
    AXConstructorCallData,
    0
    );

    const argentAccountDetails = {
        privateKey: privateKeyAX,
        account: AXcontractAddress
    }

    return argentAccountDetails
}