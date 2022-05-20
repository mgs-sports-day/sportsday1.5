import styles from '../styles/Breadcrumb.module.scss'
import { Link } from 'react-router-dom';

export default function Breadcrumb(
    { paths, current }: {
        paths: {
            name: string,
            link: string,
        }[],
        current: string,
    }
) {
    return <div className={styles.breadcrumb}>
        {paths.map(path => <Link to={path.link} key={path.link}>
            {path.name}
        </Link>)}
        <p className={styles.last}>
            {current}
        </p>
    </div>
}
