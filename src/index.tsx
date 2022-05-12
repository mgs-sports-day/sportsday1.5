import React from 'react';
import ReactDOM from 'react-dom/client';
import ApiContext from './api/context';
import App from './App';
import GSheetsAPI from 'mgssportsday-api';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/general.scss';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const ApiInstance = new GSheetsAPI('AIzaSyCFfbIjKZGPkuXnYUFD4E14flZNKMC9rQE', '1l5ZpGQ6ElmXMdLbr801MFv8cOBf9QVfAHJqiCQti1q0')
root.render(
    <React.StrictMode>
        <ApiContext.Provider value={ApiInstance}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<Home />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </ApiContext.Provider>
    </React.StrictMode>
);
