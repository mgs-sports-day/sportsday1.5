import { YearGroup } from 'mgssportsday-api/dist/types';
import { useApiQuery } from '../../api/context';
import { formLabel } from '../../api/helpers';
import Breadcrumb from '../../components/Breadcrumb';
import ColourCodedFormLabel from '../../components/ColourCodedFormLabel';
import { Table, TableRow } from '../../components/Table';
import TabSwitcher, { Tab } from '../../components/TabSwitcher';

const yearGroups: YearGroup[] = [7, 8, 9, 10];

export default function FormsList() {
    const [allStandings] = useApiQuery(api => api.getSummaryStandings());

    return <>
        <Breadcrumb
            paths={[
                { name: 'Home', link: '/' },
            ]}
            current='Forms'
        />

        <h1>All forms</h1>

        <TabSwitcher>
            {
                yearGroups.map(year => (
                    <Tab
                        label={`Year ${year}`}
                        key={year}
                    >
                        {
                            allStandings && (
                                <Table
                                    header={[
                                        { text: 'Form' },
                                        { text: `Year ${year} rank`, sortable: true },
                                        { text: 'School rank', sortable: true },
                                        { text: 'Total points' },
                                    ]}
                                >
                                    {
                                        allStandings
                                            .filter(form => form.year === year)
                                            .map(form => (
                                                <TableRow
                                                    columns={[
                                                        <ColourCodedFormLabel form={form} />,
                                                        { value: form.yearPos, autoHighlight: true },
                                                        { value: form.schoolPos, autoHighlight: true },
                                                        { value: form.points },
                                                    ]}
                                                    key={formLabel(form)}
                                                />
                                            ))
                                    }
                                </Table>
                            )
                        }
                    </Tab>
                ))
            }
        </TabSwitcher>
    </>;
}
