import React, { useEffect } from 'react';
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import { Ticker } from './api/ticker';
import styles from './styles/App.module.scss';

function App() {
    useEffect(() => {
        const ticker = new Ticker(30 * 1000)
        return () => {
            ticker.cancelEmitter()
        }
    }, [])

    return <>
        <NavBar />
        <div className={styles.container}>
            <Outlet />
        </div>
    </>
}

export default App
