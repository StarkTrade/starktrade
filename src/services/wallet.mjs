import { CallData, ec, encode, hash, stark } from "starknet"
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