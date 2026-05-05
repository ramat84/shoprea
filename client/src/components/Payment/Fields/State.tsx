import { useState, useEffect } from "react";
import { Input } from "../Input";

export const State = ({ shopForm }) => {
    const [states, setStates] = useState([])

    const { UpdateOptions, form, SetInputValue } = shopForm
    const country = form.watch('country')
    // const state = form.watch('state')

    const reg = form.register('state', { required: 'State is required' })

    useEffect(() => {
        UpdateOptions({
            dep: country,
            url: `http://localhost:4000/api/location/countries/${country}/states`,
            set: setStates,
            focus: 'state'
        })
    }, [country])

    return <Input
        icon="" name="state" label="State"
        isEnabled={states && states.length > 0}
        values={states}
        callback={(val: string) => SetInputValue('state', val)}
        register={reg}
        emptyOn={[country]} />
}
