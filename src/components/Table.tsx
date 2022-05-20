import styles from '../styles/Table.module.scss'
import type { ReactElement, ReactNode } from 'react';

export interface ColumnConfig {
    text?: string
    width?: number | string
    rowSpan?: number
    colSpan?: number
}

export function Table(
    {
        children,
        header,
        secondaryHeader,
    }: {
        children: ReactNode,
        header?: ColumnConfig[],
        secondaryHeader?: ColumnConfig[],
    }
) {
    const getColumns = (columnList: ColumnConfig[]) => {
        return <tr>
            {columnList.map((column, index) => <th
                key={index}
                style={{
                    width: column.width,
                }}
                rowSpan={column.rowSpan}
                colSpan={column.colSpan}
            >
                {column.text}
            </th>)}
        </tr>
    }

    return <div className={styles.responsiveContainer}>
        <table className={styles.table}>
            <thead>
            {header !== undefined && getColumns(header)}
            {secondaryHeader !== undefined && getColumns(secondaryHeader)}
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
        {columns.map((value, index) => <td key={index}>
            {isReactElement(value) ? value : value.value}
        </td>)}
    </tr>
}
