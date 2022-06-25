import {ReactElement, useState} from 'react';
import tabSwitcher from '../styles/TabSwitcher.module.scss';

interface TabProps {
    label: string | number;
    dataKey?: string | number;
    children?: ReactElement | ReactElement[];
}

export function Tab(
    {
        label,
        dataKey,
        children,
    }: TabProps,
): ReactElement {
    return <>{children}</>;
}

export default function TabSwitcher(
    {
        children,
        initialValue,
    }: {
        children?: ReactElement<TabProps> | ReactElement<TabProps>[];
        initialValue?: string;
    },
) {
    const getKey = (year: ReactElement<TabProps>) => year.props.dataKey || year.props.label;

    const childrenList = children && (
        children.hasOwnProperty('length') ?
            children as ReactElement<TabProps>[] :
            [children as ReactElement<TabProps>]
    );
    const [currentValue, setCurrentValue] = useState(
        childrenList ? (initialValue || getKey(childrenList[0])) : null,
    );

    return (
        <div className={tabSwitcher.container}>
            <div className={tabSwitcher.tabSelect}>
                {
                    childrenList?.map(child => (
                        <button
                            className={currentValue === getKey(child) ? tabSwitcher.active : undefined}
                            onClick={() => setCurrentValue(getKey(child))}
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
