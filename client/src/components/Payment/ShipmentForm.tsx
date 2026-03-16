import { useEffect, useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import axios from "axios";

import { Input } from "./Input";

export const ShipmentForm = () => {
    const form = useForm<FormFields>()
    const { register, handleSubmit, setValue, getValues, reset, watch } = form

    const country = watch('country')
    const state = watch('state')
    const city = watch('city')

    const [countries, setCountries] = useState([])
    const [cities, setCities] = useState([])
    const [states, setStates] = useState([])

    useEffect(() => {
        const url = 'http://localhost:4000/api/location/countries'
        axios.get(url).then((res) => { setCountries(res.data) })
    }, [reset])

    useEffect(() => {
        if (!country) return;

        const url = `http://localhost:4000/api/location/countries/${country}/states`
        axios.get(url).then((res) => {
            if (res.data && res.data.length > 0) {
                setStates(res.data);
            } else {
                const url = `http://localhost:4000/api/location/countries/${country}/cities`
                axios.get(url).then((res) => { setCities(res.data) });
                (document.querySelector("input[name=city]") as HTMLInputElement).focus()
            }
        })
    }, [country])

    useEffect(() => {
        if (!state) return;
        const url = `http://localhost:4000/api/location/countries/${country}/states/${state}/cities`
        axios.get(url).then((res) => {
            setCities(res.data);
            (document.querySelector("input[name=state]") as HTMLInputElement).focus()
        })
    }, [state])

    type FormFields = {
        country: string,
        state: string,
        city: string,
        address: string,
        email: string,
        phone: string,
        zip: number
    }


    const onSubmit = (data: any) => { return true }

    const registers = {
        country: register('country', { required: 'Country is required' }),
        city: register('city', { required: 'City is required' }),
        state: register('state', { required: 'State is required' }),
        address: register('address', { required: 'Address is required' }),

        email: register('email', {
            required: "Email is required", pattern: {
                value: /^[A-Za-z0-9.]+@[A-Za-z0-9.]+$/,
                message: "Enter a valid Email address"
            }
        }),

        phone: register('phone', {
            required: "Phone is required", pattern: {
                value: /^[\+]?[0-9\-]+$/,
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

    const setInputCountry = (val: string) => {
        setValue('city', val)
        setValue('state', '')
    }

    const setInputState = (val: string) => {
        setValue('state', val)
        setValue('city', '')
    }

    return (
        <>
            <h2>Shipping</h2>
            <FormProvider {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="inputs">
                        <Input
                            icon=""
                            name="country"
                            label="Country"
                            values={countries}
                            callback={(val: string) => setValue('country', val)}
                            register={registers.country} />
                        <Input
                            isEnabled={states && states.length > 0}
                            icon=""
                            name="state"
                            label="State"
                            values={states}
                            callback={(val: string) => setValue('state', val)}
                            register={registers.state}
                            emptyOn={[country]} />
                        <Input
                            isEnabled={cities && cities.length > 0}
                            icon=""
                            name="city"
                            label="City"
                            values={cities}
                            callback={(val: string) => setValue('city', val)}
                            register={registers.city}
                            emptyOn={[country, state]} />
                        <Input
                            icon=""
                            name="address"
                            label="Address"
                            register={registers.address} />
                        <Input
                            icon=""
                            name="phone"
                            label="Phone Number"
                            register={registers.phone} />
                        <Input
                            icon="󰇰"
                            name="email"
                            label="Email Address"
                            register={registers.email} />
                        <Input
                            icon="󰶈"
                            name="zip"
                            label="Zip Code"
                            register={registers.zip} />
                        {/* TODO: Method  */}
                    </div>
                    <button className="btn btn-submit">Next</button>
                </form>
            </FormProvider>
        </>
    )
}
