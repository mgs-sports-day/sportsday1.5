import type { Form, YearGroup } from 'mgssportsday-api/dist/types';

export const formLabel = (formLike: Form) => {
    return `${formLike.year}${formLike.form}`
}

export const formToLink = (formLike: Form | string) => {
    if (typeof formLike === "string") {
        const id = formLike.replaceAll("/", "+")
        return `/forms/${id}`
    }

    const id = `${formLike.year}${formLike.form.replaceAll("/", "+")}`
    return `/forms/${id}`
}

export const linkToForm = (link: string): Form => {
    const withSlashes = link.replaceAll("+", "/")
    // parseInt doesn't care about the form string
    const year = parseInt(withSlashes, 10) as YearGroup
    const form = withSlashes.split(year.toString())[1]

    return {
        year,
        form,
    }
}
