import { EventRecordStanding, YearGroup } from 'mgssportsday-api/dist/types';
import { useApiQuery } from '../api/context';
import Breadcrumb from '../components/Breadcrumb';
import RecordTable from '../components/RecordTable';
import TabSwitcher, { Tab } from '../components/TabSwitcher';
import { yearGroups } from './Form/FormsList';

function YearGroupRecordTable(
    {
        year,
    }: { year: YearGroup },
) {
    const records = useApiQuery(api => api.getYearGroupRecords(year))[0];

    return <RecordTable records={records} />;
}

function AllRecordTable() {
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
    const records = yearGroupRecords[0]?.map((event): EventRecordStanding => {
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
    });

    return <RecordTable records={records} />;
}

export default function RecordsOverview() {
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
                    ...yearGroups,
                    'All',
                ].map((year) => (
                    <Tab
                        label={year === 'All' ? year : `Year ${year}`}
                        key={year}
                    >
                        {
                            year === 'All' ? (
                                <AllRecordTable />
                            ) : (
                                <YearGroupRecordTable year={year as YearGroup} />
                            )
                        }
                    </Tab>
                ))
            }
        </TabSwitcher>
    </>;
}
