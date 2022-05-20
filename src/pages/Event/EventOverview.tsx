import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { eventIdToName } from '../../api/helpers';
import { SportEventName } from 'mgssportsday-api/dist/types';

export default function EventOverview() {
    const { eventId } = useParams()
    const prettyEventName = eventIdToName(eventId! as SportEventName)

    return <>
        <Breadcrumb
            paths={[
                { name: 'Home', link: '/' },
                { name: 'Events', link: '/events' },
            ]}
            current={prettyEventName}
        />
    </>
}
