import { ReactElement, useCallback, useState } from 'react';
import tabSwitcher from '../styles/TabSwitcher.module.scss';

type TabProps<T extends string | number> = {
    label: T;
    dataKey?: T | string | number;
    children?: ReactElement | ReactElement[];
}

export function Tab<T extends string | number>(
    {
        children,
    }: TabProps<T>,
): ReactElement {
    return <>{children}</>;
}

export default function TabSwitcher<T extends number | string>(
    {
        children,
        initialValue,
        onChange,
    }: {
        children?: ReactElement<TabProps<T>> | ReactElement<TabProps<T>>[];
        initialValue?: T;
        onChange?: (value: T | string | number) => void;
    },
) {
    const getKey = (year: ReactElement<TabProps<T>>) => year.props.dataKey ?? year.props.label as T;

    const childrenList = children && (
        children.hasOwnProperty('length') ?
            children as ReactElement<TabProps<T>>[] :
            [children as ReactElement<TabProps<T>>]
    );
    const [currentValue, setCurrentValue] = useState(
        childrenList ? (initialValue ?? getKey(childrenList[0])) : null,
    );

    const setTab = useCallback((value: T | string | number) => {
        onChange && onChange(value);
        setCurrentValue(value);
    }, [onChange]);

    return (
        <div className={tabSwitcher.container}>
            <div className={tabSwitcher.tabSelect}>
                {
                    childrenList?.map(child => (
                        <button
                            className={currentValue === getKey(child) ? tabSwitcher.active : undefined}
                            onClick={() => setTab(getKey(child))}
                            key={getKey(child)}
                        >
                            {child.props.label}
                        </button>
                    ))
                }
            </div>

            <div className={tabSwitcher.tabData}>
                {
                    childrenList?.filter(e => getKey(e) === currentValue)[0]
                }
            </div>
        </div>
    );
}
