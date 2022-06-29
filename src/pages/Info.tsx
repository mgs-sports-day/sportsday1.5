import Breadcrumb from '../components/Breadcrumb';
import { faDownload, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/IFrame.module.scss';
import Button from '../components/Button';

export default function Info() {
    const download = (filename: string) => {
        const a = document.createElement('a');
        a.href = require(`../assets/${filename}`)
        a.target = "_blank"
        a.download = filename
        a.click()
    }

    return <>
        <Breadcrumb
            paths={[
                { name: 'Home', link: '/' },
            ]}
            current='Information'
        />

        <h1>
            <FontAwesomeIcon icon={faInfoCircle} /> Event information
        </h1>

        <p>
            This page contains some resources to help you navigate the event.
        </p>

        <h2>Timetable</h2>
        <Button onClick={() => download('timetable.pdf')}>
            <FontAwesomeIcon icon={faDownload} /> Download PDF
        </Button>
        <iframe
            src={require("../assets/timetable.pdf")}
            className={styles.pdfFrame}
        />

        <h2>Map</h2>
        <Button onClick={() => download('map.pdf')}>
            <FontAwesomeIcon icon={faDownload} /> Download PDF
        </Button>
        <iframe
            src={require("../assets/map.pdf")}
            className={styles.pdfFrame}
        />
    </>
}
