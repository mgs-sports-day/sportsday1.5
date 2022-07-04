import { faExternalLink } from '@fortawesome/free-solid-svg-icons/faExternalLink';
import { Form } from 'mgssportsday-api/dist/types';
import { Link } from 'react-router-dom';
import { formToLink } from '../api/helpers';
import styles from '../styles/ColourCodedFormLabel.module.scss'
import LinkFAIcon from './LinkFAIcon';

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
        <LinkFAIcon icon={faExternalLink} />
    </Link>
}
