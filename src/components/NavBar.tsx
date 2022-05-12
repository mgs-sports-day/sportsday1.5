import styles from '../styles/NavBar.module.scss'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Ticker } from '../api/ticker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';

const MenuItems: [string, string][] = [
    ["Home", "/"],
    ["Events", "/events"],
    ["Forms", "/forms"],
    ["Records", "/records"],
    ["About", "/about"],
]

export default function NavBar() {
    const [completion, setCompletion] = useState(0)
    useEffect(() => {
        Ticker.addCompletionListener(setCompletion)
        return () => {
            Ticker.removeCompletionListener(setCompletion)
        }
    }, [])

    const [showMobileMenu, setShowMobileMenu] = useState(false)

    const menuItemList = MenuItems.map(([label, link]) => <li key={link}>
        <Link to={link} onClick={() => setShowMobileMenu(false)}>
            {label}
        </Link>
    </li>)

    return <nav className={styles.nav}>
        <div>
            <h1 className={styles.title}>
                <Link to="/">
                    MGS Sports Day
                </Link>
            </h1>
        </div>

        <ul className={styles.desktopMenuItems}>
            {menuItemList}
        </ul>

        <button
            className={styles.mobileMenuLink}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
            <FontAwesomeIcon
                className={styles.mobileMenuIcon}
                icon={showMobileMenu ? faClose : faBars}
            />
        </button>

        <div className={`${styles.mobileMenu} ${showMobileMenu ? styles.show : ''}`}>
            <ul>
                {menuItemList}
            </ul>
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
