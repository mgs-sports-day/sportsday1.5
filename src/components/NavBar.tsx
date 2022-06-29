import styles from '../styles/NavBar.module.scss'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Ticker } from '../api/ticker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import MGSIcon from '../assets/mgs.svg';

export const MenuItems: [string, string][] = [
    ["Home", "/"],
    ["Events", "/events"],
    ["Forms", "/forms"],
    ["Records", "/records"],
    ["Information", "/info"],
    ["About", "/about"],
]

export default function NavBar() {
    const [refreshInterval] = useState(Ticker.getRefreshInterval())
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

    const roundedTime = Math.ceil(completion * refreshInterval / 1000)
    return <nav className={styles.nav}>
        <h1 className={styles.title}>
            <Link to="/">
                <img src={MGSIcon} className={styles.logo} />
                Sports Day
            </Link>
        </h1>

        <menu role="menu" className={styles.desktopMenuItems}>
            {menuItemList}
        </menu>

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
            <menu role="menu">
                {menuItemList}
            </menu>
        </div>

        <div
            className={styles.progressBarContainer}
            role='progressbar'
            aria-valuemax={refreshInterval / 1000}
            aria-valuenow={roundedTime}
            aria-valuetext={'Refreshing in ' + ((refreshInterval/1000) - roundedTime) + 's'}
        >
            <div
                className={styles.progressBar}
                style={{
                    width: `${completion * 100}%`
                }}
            />
        </div>
    </nav>
}
