import {faSort} from '@fortawesome/free-solid-svg-icons/faSort';
import {faSortDesc} from '@fortawesome/free-solid-svg-icons/faSortDesc';
import {faSortUp} from '@fortawesome/free-solid-svg-icons/faSortUp';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {ReactElement} from 'react';
import {useCallback, useMemo, useState} from 'react';
import styles from '../styles/Table.module.scss';

export interface ColumnConfig {
    text?: string;
    width?: number | string;
    rowSpan?: number;
    colSpan?: number;
    sortable?: boolean;
}

interface IdableColumnConfig extends ColumnConfig {
    id: number;
}

enum SortDirection {
    Asc, Desc,
}

interface TableRowProps {
    columns: RowValue[];
}

export function TableRow(
    {
        columns,
    }: TableRowProps,
) {
    return <tr>
        {columns.map((value, index) => <td
            key={index}
            className={getRankingClassName(value)}
        >
            {isReactElement(value) ? value : value.value}
        </td>)}
    </tr>;
}

export function Table(
    {
        children, header, secondaryHeader,
    }: {
        children?: ReactElement<TableRowProps> | ReactElement<TableRowProps>[],
        header?: ColumnConfig[],
        secondaryHeader?: ColumnConfig[]
    },
) {
    const [sortDirection, setSortDirection] = useState(SortDirection.Desc);
    const [sortField, setSortField] = useState<number | null>(null);

    const handleSortBy = useCallback((index: number) => {
        if (sortField === index) {
            if (sortDirection === SortDirection.Desc) {
                setSortDirection(SortDirection.Asc);
            } else if (sortDirection === SortDirection.Asc) {
                setSortField(null);
                setSortDirection(SortDirection.Desc);
            }
        } else {
            setSortField(index);
            setSortDirection(SortDirection.Desc);
        }
    }, [sortDirection, sortField]);

    const getColumns = useCallback((columnList: ColumnConfig[], indices?: number[]) => {
        return <tr>
            {columnList.map((column, index) => {
                const indexHere = indices ? indices[index] : index;
                const isSortedField = indexHere === sortField;

                return <th
                    key={index.toString()}
                    style={{
                        width: column.width,
                    }}
                    rowSpan={column.rowSpan}
                    colSpan={column.colSpan}
                >
                    {column.sortable ? (<button
                        className={styles.sortButton}
                        onClick={() => handleSortBy(indexHere)}
                    >
                        {column.text}&nbsp;
                        <span className={isSortedField ? styles.activeSort : styles.sortable}>
                            <FontAwesomeIcon
                                icon={
                                    isSortedField ?
                                        sortDirection === SortDirection.Asc ?
                                            faSortUp :
                                            faSortDesc :
                                        faSort
                                }
                            />
                        </span>
                    </button>) : column.text}
                </th>;
            })}
        </tr>;
    }, [sortField, sortDirection]);

    const sortedChildren = useMemo(() => {
        const childList = (
            children === undefined ?
                children :
                children.hasOwnProperty('length') ?
                    children :
                    [children]
        ) as ReactElement<TableRowProps>[] | undefined;

        const getSortValue = (value: TextRowValue) => value.sortValue ?? Number(value.value);

        if (sortField === null || !childList) {
            return childList;
        } else {
            return Object
                .assign([] as typeof childList, childList)
                .sort((a, b) => {
                    const fields = [a.props.columns[sortField], b.props.columns[sortField]] as any[];
                    const isBad = [
                        isReactElement(fields[0]) || typeof fields[0].value !== 'number',
                        isReactElement(fields[1]) || typeof fields[1].value !== 'number',
                    ];

                    if (isBad[0] || isBad[1]) {
                        return Number(isBad[0]) - Number(isBad[1]);
                    }

                    if (sortDirection === SortDirection.Desc) {
                        return getSortValue(fields[1]) - getSortValue(fields[0]);
                    }

                    return getSortValue(fields[0]) - getSortValue(fields[1]);
                });
        }
    }, [children, sortField, sortDirection]);

    const headers = useMemo(() => {
        if (!header) {
            return <thead />;
        }

        if (!secondaryHeader) {
            return <thead>
                {getColumns(header)}
            </thead>;
        }

        const idablePrimaryHeader = header
            .map((e, i): IdableColumnConfig => ({...e, id: i}));
        const idableSecondaryHeader = secondaryHeader
            .map((e, i): IdableColumnConfig => ({...e, id: i + header.length + 1}));
        const headerCollection = idablePrimaryHeader.reduce((soFar, primary) => {
            if ((!primary.colSpan || primary.colSpan === 1) && primary.rowSpan === 2) {
                return [[...soFar[0], primary], soFar[1]];
            }

            return [
                [...soFar[0], ...soFar[1].slice(0, primary.colSpan)],
                soFar[1].slice(primary.colSpan),
            ];
        }, [[], idableSecondaryHeader] as IdableColumnConfig[][])[0];
        const indexMap = headerCollection.map(e => e.id);

        return (
            <thead>
                {
                    getColumns(
                        idablePrimaryHeader,
                        idablePrimaryHeader.map(q => indexMap.indexOf(q.id)),
                    )
                }
                {
                    getColumns(
                        idableSecondaryHeader,
                        idableSecondaryHeader.map(q => indexMap.indexOf(q.id)),
                    )
                }
            </thead>
        );
    }, [header, secondaryHeader, sortDirection, sortField]);

    return <div className={styles.responsiveContainer}>
        <table className={styles.table}>
            {headers}

            <tbody>
                {sortedChildren}
            </tbody>
        </table>
    </div>;
}

export interface TextRowValue {
    value?: string | number,
    autoHighlight?: boolean,
    isHeader?: boolean,
    sortValue?: number,
}

export type RowValue = TextRowValue | ReactElement
const isReactElement = (value: any): value is ReactElement => {
    return !!value.props;
};

const getRankingClassName = (value: RowValue): string => {
    if (isReactElement(value)) {
        return '';
    }

    if (!value.autoHighlight || typeof value.value !== 'number') {
        if (value.isHeader) {
            return styles.header;
        }

        return '';
    }

    if (value > 3) {
        return 'basic';
    }

    return [styles.gold, styles.silver, styles.bronze][value.value - 1];
};
