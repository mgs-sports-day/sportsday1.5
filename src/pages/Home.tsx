import { useApiQuery } from '../api/context';
import { formLabel, formToLink } from '../api/helpers';
import { Table, TableRow } from '../components/Table';
import { useMemo, useState } from 'react';
import { sortBy } from 'lodash-es';
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import HomeMobileMenu from '../components/HomeMobileMenu';

export default function Home() {
    const [summary] = useApiQuery(api => api.getSummaryStandings())
    const sortedSummary = useMemo(() => {
        if (!summary) {
            return undefined
        }

        return sortBy(summary, 'schoolPos')
    }, [summary])

    const [expanded, setExpanded] = useState(false)
    const filteredSummary = useMemo(() => {
        if (expanded) {
            return sortedSummary
        } else {
            return sortedSummary?.slice(0, 5)
        }
    }, [sortedSummary, expanded])

    return <>
        <HomeMobileMenu />
        <h1>Welcome to MGS Sports Day 2022!</h1>

        <p>
            This page shows all forms, across the entire school in <strong>rank</strong> order.
            For more details, please visit the individual <Link to="/forms">forms</Link> and <Link to="/events">events</Link> pages.
        </p>

        <p>
            Forms with 0 points are not ranked.
        </p>

        <Table
            header={[
                { text: 'Form' },
                { text: 'Year rank' },
                { text: 'School rank' },
                { text: 'Total points' },
            ]}
        >
            {filteredSummary?.map(results => <TableRow
                key={formLabel(results)}
                columns={[
                    <Link to={formToLink(results)}>
                        {formLabel(results)}
                    </Link>,
                    {value: results.yearPos, autoHighlight: true},
                    {value: results.schoolPos, autoHighlight: true},
                    {value: results.points},
                ]}
            />)}
        </Table>

        <Button
            onClick={() => setExpanded(!expanded)}
        >
            <FontAwesomeIcon icon={expanded ? faMinus : faPlus} />&nbsp;
            {expanded ? 'Show less' : 'Show all'}
        </Button>
    </>
}
