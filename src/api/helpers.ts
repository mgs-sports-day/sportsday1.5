import type { Form, YearGroup } from 'mgssportsday-api/dist/types';
import { SportEventName, Unit } from 'mgssportsday-api/dist/types';

export const formLabel = (formLike: Form) => {
    return `${formLike.year}${formLike.form}`;
};

export const formToLink = (formLike: Form | string) => {
    if (typeof formLike === 'string') {
        const id = formLike.replaceAll('/', '+');
        return `/forms/${id}`;
    }

    const id = `${formLike.year}${formLike.form.replaceAll('/', '+')}`;
    return `/forms/${id}`;
};

export const linkToForm = (link: string): Form => {
    const withSlashes = link.replaceAll('+', '/');
    // parseInt doesn't care about the form string
    const year = parseInt(withSlashes, 10) as YearGroup;
    const form = withSlashes.split(year.toString())[1];

    return {
        year,
        form,
    };
};

export const eventIdToName = (event: SportEventName) => {
    switch (event) {
        case SportEventName.LongJump:
            return 'Long jump';
        case SportEventName.HighJump:
            return 'High jump';
        case SportEventName.Shot:
            return 'Shot';
        case SportEventName.Javelin:
            return 'Javelin';
        case SportEventName.Run100:
            return '100m';
        case SportEventName.Run200:
            return '200m';
        case SportEventName.Run300:
            return '300m';
        case SportEventName.Run800:
            return '800m';
        case SportEventName.Run1500:
            return '1500m';
        case SportEventName.Run4x100:
            return '4x100m';
        case SportEventName.Run4x300:
            return '4x300m';
    }
};

export const unitNameToSuffix = (unit: Unit) => {
    switch (unit) {
        case 'metre':
            return 'm';
        case 'second':
            return 's';
    }
};