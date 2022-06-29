import { useWindowSize } from 'usehooks-ts';
import { Table, TableRow } from '../../components/Table';
import { SportEventName } from 'mgssportsday-api/dist/types';
import { eventIdToName } from '../../api/helpers';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from '../../components/Breadcrumb';

export default function EventsList() {
    const {width} = useWindowSize();
    const navigate = useNavigate()

    return <>
        <Breadcrumb
            paths={[
                { name: 'Home', link: '/' },
            ]}
            current='Events'
        />

        <h1>
            <FontAwesomeIcon icon={faTrophy} /> All events
        </h1>

        <Table
            header={[
                { text: 'Event name', width: width > 900 ? '80%' : '50%' },
                { text: 'View', width: width > 900 ? '20%' : '50%' },
            ]}
        >
            {Object.values(SportEventName).map(eventId => <TableRow key={eventId} columns={[
                <p>
                    <strong>{eventIdToName(eventId)}</strong>
                </p>,
                <Button onClick={() => navigate(`/events/${eventId}`)}>
                    View event
                </Button>
            ]} />)}
        </Table>
    </>
}
