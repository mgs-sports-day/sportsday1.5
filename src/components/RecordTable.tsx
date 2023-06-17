import { EventRecordStanding, YearGroup } from 'mgssportsday-api/dist/types';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useApiQuery } from '../api/context';
import { eventIdToName, unitNameToSuffix, secondsToMinutes } from '../api/helpers';
import { Table, TableRow } from './Table';

export default function RecordTable(
    {
        records,
    }: { records: EventRecordStanding[] | undefined },
): ReactElement {
    return (
        <>
            {
                records && <Table
                    header={[
                        { text: 'Event' },
                        { text: `Record year`, sortable: true },
                        { text: 'Record score', sortable: true },
                        { text: `2023 best score`, sortable: true },
                        { text: '2023 champion' },
                    ]}
                >
                    {
                        records.map(event => (
                                <TableRow
                                    columns={[
                                        <Link to={`/events/${event.event}`}>
                                            {eventIdToName(event.event)}
                                        </Link>,
                                        { value: event.standingYear },
                                        {
                                            value: secondsToMinutes(`${event.standingScore}${unitNameToSuffix(event.units)}`),
                                            sortValue: event.standingScore,
                                        },
                                        {
                                            value: event.currentScore ?
                                                secondsToMinutes(`${event.currentScore}${unitNameToSuffix(event.units)}`) :
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
            }
        </>
    );
}
