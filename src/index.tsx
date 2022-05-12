import React from 'react';
import ReactDOM from 'react-dom/client';
import ApiContext from './api/context';
import App from './App';
import GSheetsAPI from 'api';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const ApiInstance = new GSheetsAPI('AIzaSyCFfbIjKZGPkuXnYUFD4E14flZNKMC9rQE', '1l5ZpGQ6ElmXMdLbr801MFv8cOBf9QVfAHJqiCQti1q0')
root.render(
    <React.StrictMode>
        <ApiContext.Provider value={ApiInstance}>
            <App />
        </ApiContext.Provider>
    </React.StrictMode>
);
