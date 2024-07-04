import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const blast = axios.create({
    baseURL: process.env.BLAST_BASE_URL
})

export const blastService = {
    getWalletTokenBalances: async (walletAddress) => {
        try {
            const { data } = await blast.get(`/getWalletTokenBalances?walletAddress=${walletAddress}`)

            return data?.tokenBalances

        } catch(err) {

            console.error(err)
        }
    }
}
