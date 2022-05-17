import { YearGroup } from 'mgssportsday-api/dist/types';

export const formLabel = (formLike: {
    form: string
    year: YearGroup
}) => {
    return `${formLike.year}${formLike.form}`
}
