import { EventResults, SportEventName, YearGroup } from 'mgssportsday-api/dist/types';
import { useParams } from 'react-router-dom';
import { useApiQuery } from '../../api/context';
import { eventIdToName } from '../../api/helpers';
import Breadcrumb from '../../components/Breadcrumb';
import ColourCodedFormLabel from '../../components/ColourCodedFormLabel';
import EventStandingTable from '../../components/EventStandingTable';
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
                yearGroups.map((year) => (
                    <Tab
                        label={`Year ${year}`}
                        key={year}
                    >
                        <EventStandingTable event={event} year={year} />
                    </Tab>
                ))
            }
        </TabSwitcher>
    </>;
}
