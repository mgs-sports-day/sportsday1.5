import NavBar from '../components/NavBar';
import styles from '../styles/App.module.scss';

export default function NotFound() {
    return <>
        <NavBar />

        <div className={styles.container}>
            <h1>
                Oops...
            </h1>

            <p>
                We couldn't find that page!
            </p>
        </div>
    </>
}
