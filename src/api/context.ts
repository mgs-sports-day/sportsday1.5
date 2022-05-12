import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import GSheetsAPI from 'mgssportsday-api';
import { Ticker } from './ticker';

const ApiContext = createContext<GSheetsAPI | undefined>(undefined)
export default ApiContext

const useApi = () => {
    const context = useContext(ApiContext)
    if (!context) {
        throw new Error("context not yet initialised")
    }

    return context
}

export const useApiQuery = <T>(generator: (api: GSheetsAPI) => Promise<T>): [T | undefined, Error | undefined] => {
    const [response, setResponse] = useState<T | undefined>(undefined)
    const [error, setError] = useState<Error | undefined>(undefined)
    const apiContext = useApi()

    const doRequest = useCallback(async () => {
        try {
            const response = await generator(apiContext)
            setResponse(response)
        } catch (e) {
            setError(e as Error)
        }
    }, [generator, apiContext])

    useEffect(() => {
        doRequest()
            .then(() => {
                Ticker.addListener(doRequest)
            })

        return () => {
            Ticker.removeListener(doRequest)
        }
    }, [doRequest])

    return [response, error]
}
