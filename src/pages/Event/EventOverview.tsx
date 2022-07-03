import { SportEventName, YearGroup } from 'mgssportsday-api/dist/types';
import { useParams } from 'react-router-dom';
import { eventIdToName, useDefaultTab } from '../../api/helpers';
import Breadcrumb from '../../components/Breadcrumb';
import EventStandingTable from '../../components/EventStandingTable';
import TabSwitcher, { Tab } from '../../components/TabSwitcher';
import { yearGroups } from '../Form/FormsList';

export default function EventOverview() {
    const { eventId } = useParams();
    const event = eventId! as SportEventName;
    const prettyEventName = eventIdToName(event);

    const [defaultTab, setDefaultTab] = useDefaultTab();

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

        <TabSwitcher
            initialValue={defaultTab}
            onChange={setDefaultTab as (newValue: any) => void}
        >
            {
                yearGroups.map((year) => (
                    <Tab
                        label={`Year ${year}`}
                        dataKey={year}
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
