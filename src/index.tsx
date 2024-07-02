import React, { lazy, LazyExoticComponent, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import ApiContext from './api/context';
import App from './App';
import GSheetsAPI from 'mgssportsday-api';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './styles/general.scss';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const About = lazy(() => import('./pages/About'))
const EventsList = lazy(() => import('./pages/Event/EventsList'))
const EventOverview = lazy(() => import('./pages/Event/EventOverview'))
const FormsList = lazy(() => import('./pages/Form/FormsList'))
const FormOverview = lazy(() => import('./pages/Form/FormOverview'))
const RecordsOverview = lazy(() => import('./pages/RecordsOverview'))
const Info = lazy(() => import('./pages/Info'))

const SuspenseRoute = ({component: Component}: {component: LazyExoticComponent<() => JSX.Element>}) => <Suspense fallback={<></>}>
    <Component />
</Suspense>

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const ApiInstance = new GSheetsAPI('AIzaSyCFfbIjKZGPkuXnYUFD4E14flZNKMC9rQE', '1ubAvx3kJ2dpsP5c5LAjebvc1DFbDnsvNMowElcBZeT0')
root.render(
    <React.StrictMode>
        <ApiContext.Provider value={ApiInstance}>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<Home />} />
                        <Route path="about" element={<SuspenseRoute component={About} />} />

                        <Route path="events" element={<SuspenseRoute component={EventsList} />}/>
                        <Route path="events/:eventId" element={<SuspenseRoute component={EventOverview} />} />

                        <Route path="forms" element={<SuspenseRoute component={FormsList} />} />
                        <Route path="forms/:formId" element={<SuspenseRoute component={FormOverview} />} />

                        <Route path="records" element={<SuspenseRoute component={RecordsOverview} />} />

                        <Route path="info" element={<SuspenseRoute component={Info} />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </HashRouter>
        </ApiContext.Provider>
    </React.StrictMode>
);
