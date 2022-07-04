import { ReactElement, useMemo } from 'react';
import { useWindowSize } from 'usehooks-ts';
import { RowValue, Table, TableRow } from './Table';

interface Props {
    firstRowHeading: string;
    rows?: RowValue[][];
}

export default function EventDataTable(
    {
        firstRowHeading,
        rows
    }: Props,
): ReactElement {
    const totalRowHeader = { text: 'Total points', rowSpan: 2, width: '15%', sortable: true };
    const { width } = useWindowSize();
    const totalRowFirst = width <= 450;

    const sortedColumns = useMemo(() => {
        return rows?.map(row => [
            row[0],
            ...(totalRowFirst ? [row.slice(-1)[0]] : []),
            ...row.slice(1, -1),
            ...(totalRowFirst ? [] : [row.slice(-1)[0]]),
        ]);
    }, [rows, totalRowFirst]);

    if (!sortedColumns) {
        return <></>;
    }

    return (
        <Table
            header={[
                { text: firstRowHeading, rowSpan: 2 },
                ...(totalRowFirst ? [totalRowHeader] : []),
                { text: 'Competitor A', colSpan: 2 },
                { text: 'Competitor B', colSpan: 2 },
                { text: 'Competitor C', colSpan: 2 },
                { text: 'Record bonus', rowSpan: 2, width: '10%' },
                ...(totalRowFirst ? [] : [totalRowHeader]),
            ]}
            secondaryHeader={[
                { text: 'Position', sortable: true },
                { text: 'Points', sortable: true },
                { text: 'Position', sortable: true },
                { text: 'Points', sortable: true },
                { text: 'Position', sortable: true },
                { text: 'Points', sortable: true },
            ]}
        >
            {
                sortedColumns.map((e, i) => <TableRow columns={e} key={i} />)
            }
        </Table>
    );
}