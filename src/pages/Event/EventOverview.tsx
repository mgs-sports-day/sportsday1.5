import { EventResults, SportEventName, YearGroup } from 'mgssportsday-api/dist/types';
import { useParams } from 'react-router-dom';
import { useApiQuery } from '../../api/context';
import { eventIdToName } from '../../api/helpers';
import Breadcrumb from '../../components/Breadcrumb';
import EventStandingTable from '../../components/EventStandingTable';
import TabSwitcher, { Tab } from '../../components/TabSwitcher';
import { yearGroups } from '../Form/FormsList';

export default function EventOverview() {
    const { eventId } = useParams();
    const event = eventId! as SportEventName;
    const prettyEventName = eventIdToName(event);

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
                        <EventStandingTable
                            event={event}
                            year={year}
                        />
                    </Tab>
                ))
            }
        </TabSwitcher>
    </>;
}
