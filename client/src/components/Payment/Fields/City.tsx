import { useState, useEffect } from "react";
import { Input } from "../Input";

export const City = ({ shopForm }) => {
    const [cities, setCities] = useState([])
    const { UpdateOptions, form, SetInputValue } = shopForm

    const country = form.watch('country')
    const state = form.watch('state')
    const reg = form.register('city', { required: 'City is required' })

    useEffect(() => {
        UpdateOptions({
            dep: country,
            url: `http://localhost:4000/api/location/countries/${country}/cities`,
            set: setCities,
            focus: 'city'
        })
    }, [country, state])

    useEffect(() => {
        UpdateOptions({
            dep: state,
            url: `http://localhost:4000/api/location/countries/${country}/states/${state}/cities`,
            set: setCities,
            focus: 'city'
        })
    }, [state])

    return <Input
        icon="" name="city" label="City"
        isEnabled={cities && cities.length > 0}
        values={cities}
        callback={(val: string) => SetInputValue('city', val)}
        register={reg}
        emptyOn={[country, state]} />
}
