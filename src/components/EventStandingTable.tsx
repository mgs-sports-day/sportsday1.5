import { EventResults, SportEventName, YearGroup } from 'mgssportsday-api/dist/types';
import { ReactElement, useCallback, useMemo } from 'react';
import { useApiQuery } from '../api/context';
import ColourCodedFormLabel from './ColourCodedFormLabel';
import EventDataTable from './EventDataTable';

type ArraySpec<T extends any[]> = T extends (infer U)[] ? U : never;

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
    const getFormRes = useCallback(<T extends keyof EventResults>(form: string, group: T) => {
        return standings && (standings[group].filter(e => e.letter === form)[0] as ArraySpec<EventResults[T]>);
    }, [standings]);

    const tableContents = useMemo(() => {
        return forms
            ?.sort((a, b) => (
                getFormRes(b, 'total')?.pts || 0
            ) - (
                getFormRes(a, 'total')?.pts || 0
            ))
            .map(form => {
                    return [
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
                        { value: getFormRes(form, 'rb')?.pts },
                        { value: getFormRes(form, 'total')?.pts },
                    ];
                },
            );
    }, [forms, standings]);

    return (
        <EventDataTable
            rows={tableContents}
            firstRowHeading='Form'
        />
    );
}
