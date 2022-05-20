import React from 'react';
import ReactDOM from 'react-dom/client';
import ApiContext from './api/context';
import App from './App';
import GSheetsAPI from 'mgssportsday-api';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/general.scss';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import About from './pages/About';
import EventsList from './pages/Event/EventsList';
import EventOverview from './pages/Event/EventOverview';
import FormsList from './pages/Form/FormsList';
import FormOverview from './pages/Form/FormOverview';
import RecordsOverview from './pages/RecordsOverview';

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
                        <Route path="about" element={<About />} />

                        <Route path="events" element={<EventsList />} />
                        <Route path="events/:eventId" element={<EventOverview />} />

                        <Route path="forms" element={<FormsList />} />
                        <Route path="forms/:formId" element={<FormOverview />} />

                        <Route path="records" element={<RecordsOverview />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </ApiContext.Provider>
    </React.StrictMode>
);
