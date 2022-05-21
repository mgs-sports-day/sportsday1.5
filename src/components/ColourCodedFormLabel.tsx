import { Form } from 'mgssportsday-api/dist/types';
import { Link } from 'react-router-dom';
import { formToLink } from '../api/helpers';
import styles from '../styles/ColourCodedFormLabel.module.scss'

export default function ColourCodedFormLabel(
    {
        form
    }: {
        form: Form
    }
) {
    return <Link
        to={formToLink(form)}
        className={`${styles.label} ${styles['y' + form.year]}`}
    >
        {form.year}{form.form}
    </Link>
}
