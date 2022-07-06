import type { Form, YearGroup } from 'mgssportsday-api/dist/types';
import { SportEventName, Unit } from 'mgssportsday-api/dist/types';
import { useMemo } from 'react';

export const formLabel = (formLike: Form) => {
    return `${formLike.year}${formLike.form}`;
};

export const useDefaultTab = (): [YearGroup | undefined, (newValue: YearGroup) => void] => {
    const tab = useMemo(() => {
        const storageRes = localStorage.getItem('default_year_group');
        if (storageRes && Number(storageRes)) {
            return parseInt(storageRes, 10) as YearGroup;
        }

        return;
    }, []);

    const update = (newValue: YearGroup) => {
        if (isNaN(newValue)) return;

        localStorage.setItem('default_year_group', newValue.toString(10));
    };

    return [tab, update];
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

export const getRankWhere = <T extends object, U extends keyof T, V extends keyof T>(
    items: T[],
    key: U,
    item: T[U],
    rankBy: V,
    reverse?: boolean,
) => {
    const sorted = Object.assign([], items).sort((a, b) => b[rankBy] - a[rankBy]) as T[];
    if (reverse) {
        sorted.reverse();
    }

    const ranked = sorted.reduce(
        (a, e): [T, number][] =>
            [
                ...a,
                a.length ? [
                    e,
                    e[rankBy] === a.slice(-1)[0][0][rankBy] ?
                        a.slice(-1)[0][1] :
                        a.slice(-1)[0][1] + a.filter(e => e[1] === a.slice(-1)[0][1]).length,
                ] : [e, 1],
            ],
        [] as [T, number][],
    );

    return ranked.filter(e => e[0][key] === item)[0][1];
};

export const secondsToMinutes = (seconds: string | number) => (seconds.toString().endsWith('s') || typeof seconds === 'number') 
    ? (parseInt(seconds.toString()) >= 60 ? `${Math.floor(parseInt(seconds.toString()) / 60)}m ${parseInt(seconds.toString()) % 60}s` : `${parseInt(seconds.toString())}s`)
    : seconds
