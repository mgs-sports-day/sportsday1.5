import { EventRecordStanding } from 'mgssportsday-api/dist/types';
import { Link } from 'react-router-dom';
import { useApiQuery } from '../api/context';
import { eventIdToName, unitNameToSuffix } from '../api/helpers';
import Breadcrumb from '../components/Breadcrumb';
import { Table, TableRow } from '../components/Table';
import TabSwitcher, { Tab } from '../components/TabSwitcher';
import { yearGroups } from './Form/FormsList';

export default function RecordsOverview() {
    const yearGroupRecords = [
        useApiQuery(api => api.getYearGroupRecords(7))[0],
        useApiQuery(api => api.getYearGroupRecords(8))[0],
        useApiQuery(api => api.getYearGroupRecords(9))[0],
        useApiQuery(api => api.getYearGroupRecords(10))[0],
    ];

    const getBestRecord = (
        yearGroups: (EventRecordStanding[] | undefined)[],
        event: EventRecordStanding,
        key: keyof EventRecordStanding,
    ) => yearGroups
        .map(yearGroup => yearGroup?.filter(yearGroupEvent => yearGroupEvent.event === event.event)[0])
        .map((ygResults, yearGroup): [EventRecordStanding | undefined, number, number | undefined] => [
            ygResults,
            yearGroup,
            ygResults && ygResults[key] as number,
        ])
        .filter(e => e[2])
        .sort((a, b) => b[2] && a[2] ? event.units === 'second' ? a[2] - b[2] : b[2] - a[2] : 1000)[0];
    const records = [
        ...yearGroupRecords,
        yearGroupRecords[0]?.map((event): EventRecordStanding => {
            const bestCurrent = getBestRecord(yearGroupRecords, event, 'currentScore');
            const bestStanding = getBestRecord(yearGroupRecords, event, 'standingScore');

            return {
                doScore: event.doScore,
                event: event.event,
                units: event.units,

                standingHolder: bestStanding && bestStanding[0] ?
                    `${bestStanding[0].standingHolder} (y${yearGroups[bestStanding[1]]})` :
                    '',
                standingYear: bestStanding && bestStanding[0]?.standingYear || 2021,
                standingScore: bestStanding && bestStanding[0]?.standingScore || 0,

                currentHolder: bestCurrent && bestCurrent[0] ?
                    `${bestCurrent[0].standingHolder} (y${yearGroups[bestCurrent[1]]})` :
                    '',
                currentYear: bestCurrent && bestCurrent[0]?.currentYear || 2021,
                currentScore: bestCurrent && bestCurrent[0]?.currentScore || 0,
            };
        }),
    ];

    return <>
        <Breadcrumb
            paths={[
                { name: 'Home', link: '/' },
            ]}
            current='Records'
        />

        <h1>Records</h1>

        <TabSwitcher>
            {
                [
                    ...yearGroups.map(e => `Year ${e}`),
                    'All',
                ].map((year, yearIndex) => (
                    <Tab
                        label={year}
                        key={year}
                    >
                        {
                            records[yearIndex] && (
                                <Table
                                    header={[
                                        { text: 'Event' },
                                        { text: `Record year`, sortable: true },
                                        { text: 'Record score', sortable: true },
                                        { text: `2022 best score`, sortable: true },
                                        { text: '2022 champion' },
                                    ]}
                                >
                                    {
                                        records[yearIndex]
                                            ?.map(event => (
                                                <TableRow
                                                    columns={[
                                                        <Link to={`/events/${event.event}`}>
                                                            {eventIdToName(event.event)}
                                                        </Link>,
                                                        { value: event.standingYear },
                                                        {
                                                            value: `${event.standingScore}${unitNameToSuffix(event.units)}`,
                                                            sortValue: event.standingScore,
                                                        },
                                                        {
                                                            value: event.currentScore ?
                                                                `${event.currentScore}${unitNameToSuffix(event.units)}` :
                                                                '',
                                                            sortValue: event.currentScore || -100,
                                                        },
                                                        { value: event.currentHolder },
                                                    ]}
                                                    key={event.event}
                                                />
                                            ))
                                    }
                                </Table>
                            )
                        }
                    </Tab>
                ))
            }
        </TabSwitcher>
    </>;
}
