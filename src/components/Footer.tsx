import styles from '../styles/Footer.module.scss'

export default function Footer() {
    return <footer className={styles.semantic}>
        <hr className={styles.divider} />

        <p className={styles.disclaimer}>
            This website is part of a family of co-curricular sites run by students and staff of the Manchester Grammar School.
            The main school website is at&nbsp;
            <a
                href='https://www.mgs.org'
                target='_blank'
                rel='noreferrer'
            >
                mgs.org
            </a>.
        </p>

        <p className={styles.disclaimer}>
            Website &copy; 2022 Pal Kerecsenyi, Theodore Tucker, Geza Kerecsenyi.&nbsp;
            <a
                href='https://github.com/mgs-sports-day/sportsday1.5'
                target='_blank'
                rel='noreferrer'
            >
                Source code
            </a>
            &nbsp;available under MIT license.
        </p>
    </footer>
}
