import styles from '../styles/Table.module.scss'
import type { ReactNode } from 'react';

export function Table(
    {
        children,
        columns,
    }: {
        children: ReactNode,
        columns: string[],
    }
) {
    return <div className={styles.responsiveContainer}>
        <table className={styles.table}>
            <thead>
            <tr>
                {columns.map(column => <th key={column}>
                    {column}
                </th>)}
            </tr>
            </thead>
            <tbody>
            {children}
            </tbody>
        </table>
    </div>
}

export interface RowValue {
    value?: string | number,
    autoHighlight?: boolean,
}

export function TableRow(
    {
        columns,
    }: {
        columns: RowValue[],
    }
) {
    return <tr>
        {columns.map((value, index) => <td key={index}>
            {value.value}
        </td>)}
    </tr>
}
