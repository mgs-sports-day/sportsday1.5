import Breadcrumb from '../../components/Breadcrumb';

export default function FormsList() {
    return <>
        <Breadcrumb
            paths={[
                { name: 'Home', link: '/' },
            ]}
            current='Forms'
        />

        <h1>All forms</h1>
    </>
}
