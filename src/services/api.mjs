import { dexSc } from "./http.mjs"
export const api = {
    getTokenDetails: async (data) => {
        return await dexSc.get(`${data}`)
    },


    
}

