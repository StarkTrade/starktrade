import {Account, ec, json, stark, Provider, hash, CallData, encode } from "starknet"
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
    // connect provider
    const provider = new Provider({ sequencer: { network: "SN_MAIN" } });

    //new Argent X account v0.2.3
    const argentXproxyClassHash = '0x25ec026985a3bf9d0cc1fe17326b245dfdc3ff89b8fde106542a3ea56c5a918';
    const argentXaccountClassHash =
    '0x033434ad846cdd5f23eb73ff09fe6fddd568284a0fb7d1be20ee482f044dabe2';

    // Generate public and private key pair.
    const privateKeyAX = stark.randomAddress();

    const starkKeyPubAX = ec.starkCurve.getStarkKey(privateKeyAX);

    // Calculate future address of the ArgentX account
    const AXproxyConstructorCallData = CallData.compile({
        implementation: argentXaccountClassHash,
        selector: hash.getSelectorFromName('initialize'),
        calldata: CallData.compile({ signer: starkKeyPubAX, guardian: '0' }),
    });

    const AXcontractAddress = hash.calculateContractAddressFromHash(
    starkKeyPubAX,
    argentXproxyClassHash,
    AXproxyConstructorCallData,
    0
    );

    const argentAccountDetails = {
        privateKey: privateKeyAX,
        account: AXcontractAddress
    }

    return argentAccountDetails
}