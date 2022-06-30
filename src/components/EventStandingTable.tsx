import { EventResults, SportEventName, YearGroup } from 'mgssportsday-api/dist/types';
import { ReactElement } from 'react';
import { useApiQuery } from '../api/context';
import ColourCodedFormLabel from './ColourCodedFormLabel';
import { Table, TableRow } from './Table';

export default function EventStandingTable(
    {
        year,
        event,
    }: {
        year: YearGroup,
        event: SportEventName
    },
): ReactElement {
    const standings = useApiQuery(api => api.getEventResults(event, year))[0] as EventResults | undefined;

    const forms = standings?.total.map(e => e.letter);
    const getFormRes = (form: string, group: keyof EventResults) => {
        return standings && standings[group].filter(e => e.letter === form)[0];
    };

    return (
        <Table
            header={[
                { text: 'Form', rowSpan: 2 },
                { text: 'Competitor A', colSpan: 2 },
                { text: 'Competitor B', colSpan: 2 },
                { text: 'Competitor C', colSpan: 2 },
                { text: 'Total points (with bonus)', rowSpan: 2, width: '10%', sortable: true },
                { text: 'Overall position', rowSpan: 2, sortable: true, width: '12%' },
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
            {forms
                ?.sort((a, b) => (
                    getFormRes(b, 'total')?.pts || 0
                ) - (
                    getFormRes(a, 'total')?.pts || 0
                ))
                .map(form => (
                        <TableRow
                            key={form}
                            columns={[
                                <ColourCodedFormLabel
                                    form={{
                                        year,
                                        form,
                                    }}
                                />,
                                { value: getFormRes(form, 'a')?.pos, autoHighlight: true },
                                { value: getFormRes(form, 'a')?.pts },
                                { value: getFormRes(form, 'b')?.pos, autoHighlight: true },
                                { value: getFormRes(form, 'b')?.pts },
                                { value: getFormRes(form, 'c')?.pos, autoHighlight: true },
                                { value: getFormRes(form, 'c')?.pts },
                                { value: getFormRes(form, 'total')?.pts },
                                { value: getFormRes(form, 'total')?.pos, autoHighlight: true },
                            ]}
                        />
                    ),
                )
            }
        </Table>
    );
}