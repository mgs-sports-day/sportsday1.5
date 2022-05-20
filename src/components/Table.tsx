import styles from '../styles/Table.module.scss'
import type { ReactElement, ReactNode } from 'react';

export function Table(
    {
        children,
        columns,
        widths,
    }: {
        children: ReactNode,
        columns: string[],
        widths?: (string | number)[],
    }
) {
    return <div className={styles.responsiveContainer}>
        <table className={styles.table}>
            <thead>
            <tr>
                {columns.map((column, index) => <th
                    key={column}
                    style={{
                        width: widths && (index < widths.length) ? widths[index] : undefined,
                    }}
                >
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

export interface TextRowValue {
    value?: string | number,
    autoHighlight?: boolean,
}

export type RowValue = TextRowValue | ReactElement
const isReactElement = (value: any): value is ReactElement => {
    return !!value.props
}

export function TableRow(
    {
        columns,
    }: {
        columns: RowValue[],
    }
) {
    return <tr>
        {columns.map((value, index) => {
            return isReactElement(value) ? value : <td key={index}>
                {value.value}
            </td>
        })}
    </tr>
}
