import axios from "axios"

import { useForm } from "react-hook-form"
import { Button } from "../../Elements/Button"
import { Checkbox } from "../../Form/Checkbox"
import type { Order } from "../../../generated/prisma/client"
import type { Address } from "../../../types/Address"

export const Cash = () => {
    const form = useForm()

    const onSubmit = () => {
        const url = 'http://localhost:4000/api/orders'
        const values = form.getValues()

        const address : Address = {
            'country': values.country,
            'state': values.state,
            'city': values.city,
            'zip': parseInt(values.zip),
            'address': values.address,
            'phone': values.phone,
            'email': values.email
        }

        const data : Order = {
           'address ': JSON.stringify(address)
        }

        axios.post(url, data).then((res) => {
            console.log(res.data)
        })
    }

    return (
        <>
            <h1>Pay in cash</h1>
            <h2>Approve payment in store</h2>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Checkbox name="approved" form={form} label="I will pick up the order from the store" />
                <Button type="action"><i>󰒊</i> Send order</Button>
            </form>
        </>
    )
}
