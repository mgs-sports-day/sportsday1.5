import styles from '../styles/Button.module.scss'
import { ReactNode } from 'react';

export default function Button(
    {
        children,
        onClick,
    }: {
        children: ReactNode,
        onClick: () => void,
    }
) {
    return <button
        className={styles.default}
        onClick={onClick}
    >
        {children}
    </button>
}
