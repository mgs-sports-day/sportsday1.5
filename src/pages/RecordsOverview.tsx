import Breadcrumb from '../components/Breadcrumb';

export default function RecordsOverview() {
    return <>
        <Breadcrumb
            paths={[
                { name: 'Home', link: '/' },
            ]}
            current='Records'
        />

        <h1>Records</h1>
    </>
}
