import { useEffect, useState } from "react";
import { useForm, FormProvider, type SubmitHandler } from "react-hook-form"

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

    type FormFields = {
        country: string,
        city: string,
        address: string,
        email: string,
        phone: string,
        zip: number
    }

    const form = useForm<FormFields>()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = form

    const onSubmit = (data) => { return true }

    const registers = {
        country: register('country', { required: 'Country is required' }),
        city: register('city', { required: 'City is required' }),
        address: register('address', { required: 'Address is required' }),

        email: register('email', {
            required: "Email is required", pattern: {
                value: /^[A-Za-z0-9.]+@[A-Za-z0-9.]+$/,
                message: "Enter a valid Email address"
            }
        }),

        phone: register('phone', {
            required: "Phone is required", pattern: {
                value: /^[0-9\+\-]+$/,
                message: "Enter a valid Phone number"
            }
        }),

        zip: register('zip', {
            required: "Zip code is required", pattern: {
                value: /^[0-9]+$/,
                message: "Enter a valid Phone number"
            }
        }),
    }

    return (
        <>
            <h2>Shipping</h2>
            <FormProvider {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input name="country" label="Country" values={countries} callback={setCountry} register={registers.country} />
                    {/*<Input name="state" label="State" values={states} /> */}
                    <Input name="city" label="City" values={cities} register={registers.city} />
                    <Input name="address" label="Address" register={registers.address} />
                    <Input name="phone" label="Phone Number" register={registers.phone} />
                    <Input name="email" label="Email Address" register={registers.email} />
                    <Input name="zip" label="Zip Code" register={registers.zip} />
                    {/* TODO: Method  */}
                    <button className="btn btn-submit">Submit</button>
                </form>
            </FormProvider>
        </>
    )
}
