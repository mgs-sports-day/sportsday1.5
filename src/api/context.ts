import GSheetsAPI from 'mgssportsday-api';
import { RequestBuilder } from 'mgssportsday-api/dist/cache';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Ticker } from './ticker';

const ApiContext = createContext<GSheetsAPI | undefined>(undefined);
export default ApiContext;

const useApi = () => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error('context not yet initialised');
    }

    return context;
};

// Pass all API calls through this to make sure they get reloaded at the regular interval specified in App.tsx via Ticker.
export const useApiQuery = <T>(generator: (api: GSheetsAPI) => RequestBuilder<T> | Promise<RequestBuilder<T>>): [T | undefined, boolean, Error | undefined] => {
    const [response, setResponse] = useState<T | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | undefined>(undefined);
    const apiContext = useApi();

    const doRequest = useCallback(async (allowCache: boolean) => {
        try {
            const generatorInstance = generator(apiContext);
            const generatorRes = generatorInstance.hasOwnProperty('then') ?
                generatorInstance as RequestBuilder<T> :
                await generatorInstance;

            const response = await generatorRes.run(allowCache);
            setResponse(response);
        } catch (e) {
            setError(e as Error);
        }
    }, []);

    const doRequestNoCache = useCallback(
        () => doRequest(false),
        [],
    );

    useEffect(() => {
        doRequest(true)
            .then(() => {
                setLoading(false);
            });

        Ticker.addListener(doRequestNoCache);
        return () => {
            Ticker.removeListener(doRequestNoCache);
        };
    }, []);

    return [response, loading, error];
};
