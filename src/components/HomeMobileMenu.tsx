import styles from '../styles/HomeMobileMenu.module.scss'
import { MenuItems } from './NavBar';
import { Link } from 'react-router-dom';

export default function HomeMobileMenu() {
    return <div className={styles.container}>
        <ul>
            {MenuItems.slice(1).map(([label, link]) => <li key={link}>
                <Link to={link}>
                    {label}
                </Link>
            </li>)}
        </ul>
    </div>
}
