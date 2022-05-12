import styles from '../styles/NavBar.module.scss'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Ticker } from '../api/ticker';

export default function NavBar() {
    const [completion, setCompletion] = useState(0)
    useEffect(() => {
        Ticker.addCompletionListener(setCompletion)
        return () => {
            Ticker.removeCompletionListener(setCompletion)
        }
    }, [])

    return <nav className={styles.nav}>
        <div>
            <h1 className={styles.title}>
                <Link to="/">
                    MGS Sports Day
                </Link>
            </h1>
        </div>

        <div className={styles.progressBarContainer}>
            <div
                className={styles.progressBar}
                style={{
                    width: `${completion * 100}%`
                }}
            />
        </div>
    </nav>
}
