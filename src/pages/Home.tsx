import { useApiQuery } from '../api/context';
import { formLabel } from '../api/helpers';

export default function Home() {
    const [summary] = useApiQuery((api) => api.getSummaryStandings())

    return <>
        <h1>Welcome to MGS Sports Day 2022!</h1>

        <table>
            <thead>
            <tr>
                <th>Form</th>
                <th>Year position</th>
                <th>School position</th>
                <th>Total points</th>
            </tr>
            </thead>
            <tbody>
            {summary?.map(results => <tr key={formLabel(results)}>
                <td>{formLabel(results)}</td>
                <td>{results.yearPos}</td>
                <td>{results.schoolPos}</td>
                <td>{results.points}</td>
            </tr>)}
            </tbody>
        </table>
    </>
}
