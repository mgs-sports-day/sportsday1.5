import React, { useEffect } from 'react';
import { useApi } from './api/context';

function App() {
    const api = useApi()
    useEffect(() => {
        api.getYearGroupRecords(7)
            .then(events => {
                const event = events[0]
                console.log(event)
            })
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    )
}

export default App
