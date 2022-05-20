import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { linkToForm } from '../../api/helpers';

export default function FormOverview() {
    const { formId } = useParams()
    const form = useMemo(() => {
        if (formId) {
            return linkToForm(formId)
        }
    }, [formId])
    return <></>
}
