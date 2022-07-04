import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LinkFAIcon(
    {
        icon
    }: {
        icon: IconProp
    }
) {
    return (
        <span style={{
            'marginLeft': '5px',
        }}>
            <FontAwesomeIcon icon={icon} />
        </span>
    )
}