import React, { useEffect } from 'react';
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import { Ticker } from './api/ticker';
import styles from './styles/App.module.scss';
import Footer from './components/Footer';
import useAnalytics from './api/analytics';

function App() {
    // useAnalytics()

    useEffect(() => {
        const ticker = new Ticker()
        return () => {
            ticker.cancelEmitter()
        }
    }, [])

    return <>
        <NavBar />
        <div className={styles.container}>
            <Outlet />
            <Footer />
        </div>
    </>
}

export default App
