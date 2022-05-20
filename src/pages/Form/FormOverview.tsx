import { Link, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { eventIdToName, linkToForm } from '../../api/helpers';
import type { Form } from 'mgssportsday-api/dist/types';
import { useApiQuery } from '../../api/context';
import { Table, TableRow } from '../../components/Table';

export default function FormOverview() {
    const { formId } = useParams()
    const form = useMemo<Form>(() => {
        if (formId) {
            return linkToForm(formId)
        } else {
            throw new Error("No form ID provided!")
        }
    }, [formId])

    const [formResults] = useApiQuery(api => api.getFormResults(form.year, form.form))
    const [allStandings] = useApiQuery(api => api.getSummaryStandings())

    const thisFormStanding = useMemo(() => {
        if (!allStandings) return undefined
        return allStandings.find(e => e.year === form.year && e.form === form.form)
    }, [allStandings, form])

    return <>
        <h1>
            {form.year}{form.form}
            <span>
                Event breakdown
            </span>
        </h1>

        {allStandings !== undefined && <Table>
            <TableRow columns={[
                {value: 'Total points'},
                {value: thisFormStanding?.points}
            ]} />
            <TableRow columns={[
                {value: 'School position'},
                {value: thisFormStanding?.schoolPos, autoHighlight: true}
            ]} />
            <TableRow columns={[
                {value: 'Year position'},
                {value: thisFormStanding?.yearPos, autoHighlight: true}
            ]} />
        </Table>}

        {formResults !== undefined && <Table
            header={[
                { text: 'Event', rowSpan: 2 },
                { text: 'Competitor A', colSpan: 2 },
                { text: 'Competitor B', colSpan: 2 },
                { text: 'Competitor C', colSpan: 2 },
                { text: 'Record bonus', rowSpan: 2 },
                { text: 'Total points', rowSpan: 2 },
            ]}
            secondaryHeader={[
                { text: 'Position' },
                { text: 'Points' },
                { text: 'Position' },
                { text: 'Points' },
                { text: 'Position' },
                { text: 'Points' },
            ]}
        >
            {formResults.map(result => <TableRow
                key={result.eventDb}
                columns={[
                    <Link to={`/events/${result.eventDb}`}>
                        {eventIdToName(result.eventDb)}
                    </Link>,
                    { value: result.posA, autoHighlight: true },
                    { value: result.ptsA },
                    { value: result.posB, autoHighlight: true },
                    { value: result.ptsB },
                    { value: result.posC, autoHighlight: true },
                    { value: result.ptsC },
                    { value: result.ptsRB },
                    { value: result.ptsTOTAL },
                ]}
            />)}
        </Table>}
    </>
}
