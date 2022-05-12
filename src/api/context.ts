import { createContext, useContext } from 'react';
import GSheetsAPI from 'api'

const ApiContext = createContext<GSheetsAPI | undefined>(undefined)
export default ApiContext

export const useApi = () => {
    const context = useContext(ApiContext)
    if (!context) {
        throw new Error("context not yet initialised!")
    }

    return context
}
