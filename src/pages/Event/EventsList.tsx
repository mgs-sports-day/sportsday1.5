import { Table, TableRow } from '../../components/Table';
import { SportEventName } from 'mgssportsday-api/dist/types';
import { eventIdToName } from '../../api/helpers';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from '../../components/Breadcrumb';

export default function EventsList() {
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
                { text: 'Event name', width: '80%' },
                { text: 'View', width: '20%' },
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
