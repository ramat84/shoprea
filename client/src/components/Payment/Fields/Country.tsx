import { useState, useEffect } from "react";
import { Input } from "../Input";

export const Country = ({ shopForm }) => {
    const { UpdateOptions, form, SetInputValue } = shopForm
    const [countries, setCountries] = useState([])

    const reg = form.register('country', { required: 'Country is required' })

    useEffect(() => {
        UpdateOptions({
            url: 'http://localhost:4000/api/location/countries',
            set: setCountries
        })
    }, [form.reset])

    return <Input
        icon="" name="country" label="Country"
        values={countries}
        callback={(val: string) => SetInputValue('country', val)}
        register={reg} />
}
