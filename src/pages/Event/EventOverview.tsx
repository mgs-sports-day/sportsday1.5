import { EventResults, SportEventName, YearGroup } from 'mgssportsday-api/dist/types';
import { useParams } from 'react-router-dom';
import { useApiQuery } from '../../api/context';
import { eventIdToName } from '../../api/helpers';
import Breadcrumb from '../../components/Breadcrumb';
import ColourCodedFormLabel from '../../components/ColourCodedFormLabel';
import { Table, TableRow } from '../../components/Table';
import TabSwitcher, { Tab } from '../../components/TabSwitcher';
import { yearGroups } from '../Form/FormsList';

export default function EventOverview() {
    const { eventId } = useParams();
    const event = eventId! as SportEventName;
    const prettyEventName = eventIdToName(event);

    const eventStandings = [
        useApiQuery(api => api.getEventResults(event, 7))[0],
        useApiQuery(api => api.getEventResults(event, 8))[0],
        useApiQuery(api => api.getEventResults(event, 9))[0],
        useApiQuery(api => api.getEventResults(event, 10))[0],
    ] as (EventResults | undefined)[];
    const getFormsInYear = (year: YearGroup) => eventStandings[year - 7]?.total.map(e => e.letter);
    const getFormRes = (yearIndex: number, form: string, group: keyof EventResults) => {
        const yearEvents = eventStandings[yearIndex];
        return yearEvents && yearEvents[group].filter(e => e.letter === form)[0];
    };

    console.log(eventStandings);

    return <>
        <Breadcrumb
            paths={[
                { name: 'Home', link: '/' },
                { name: 'Events', link: '/events' },
            ]}
            current={prettyEventName}
        />

        <h1>
            {prettyEventName}
        </h1>

        <TabSwitcher>
            {
                yearGroups.map((year, yearId) => (
                    <Tab
                        label={`Year ${year}`}
                        key={year}
                    >
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
                            {getFormsInYear(year)
                                ?.sort((a, b) => (
                                    getFormRes(yearId, b, 'total')?.pts || 0
                                ) - (
                                    getFormRes(yearId, a, 'total')?.pts || 0
                                ))
                                .map(form => <TableRow
                                    key={form}
                                    columns={[
                                        <ColourCodedFormLabel
                                            form={{
                                                year,
                                                form,
                                            }}
                                        />,
                                        { value: getFormRes(yearId, form, 'a')?.pos, autoHighlight: true },
                                        { value: getFormRes(yearId, form, 'a')?.pts },
                                        { value: getFormRes(yearId, form, 'b')?.pos, autoHighlight: true },
                                        { value: getFormRes(yearId, form, 'b')?.pts },
                                        { value: getFormRes(yearId, form, 'c')?.pos, autoHighlight: true },
                                        { value: getFormRes(yearId, form, 'c')?.pts },
                                        { value: getFormRes(yearId, form, 'total')?.pts },
                                        { value: getFormRes(yearId, form, 'total')?.pos, autoHighlight: true },
                                    ]}
                                />)}
                        </Table>
                    </Tab>
                ))
            }
        </TabSwitcher>
    </>;
}
