import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form"
import { FormContext } from '../../contexts/FormContext'

import axios from "axios";

import { Input } from "./Input";

export const ShipmentForm = () => {
    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState<string>('')
    const [cities, setCities] = useState([])
    const [states, setStates] = useState([])

    useEffect(() => {
        const url = 'http://localhost:4000/api/location/countries'
        axios.get(url).then((res) => { setCountries(res.data) })
    }, [])

    useEffect(() => {
        if (!country) return;

        const url = `http://localhost:4000/api/location/countries/${country}/cities`
        axios.get(url).then((res) => { setCities(res.data) })
    }, [country])

    const form = useForm()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = form

    const onSubmit = (data) => { return true }

    return (
        <FormContext.Provider value={form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input name="country" label="Country" values={countries} callback={setCountry} />
                {/*<Input name="state" label="State" values={states} /> */}
                <Input name="city" label="City" values={cities} />
                <Input name="address" label="Address" />
                <Input name="phone" label="Phone Number" />
                <Input name="email" label="Email Address" />
                <Input name="zip" label="Zip Code" />
                {/* TODO: Method  */}
            </form >
        </FormContext.Provider>
    )
}
