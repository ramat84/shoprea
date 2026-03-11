import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "./Input";

export const Shipment = () => {
    const [countries, setCountries] = useState([])

    useEffect(() => {
        let url = 'http://localhost:4000/api/location/countries'
        axios.get(url).then((res) => {
            setCountries(res.data)
        })

    }, [])

    return <form>
        <Input name="country" label="Country" values={countries} />
        <Input name="city" label="City" />
        <Input name="address" label="Address" />
        <Input name="phone" label="Phone Number" />
        <Input name="email" label="Email Address" />
        <Input name="zip" label="Zip Code" />
        {/* TODO: Method  */}
    </form>
}
