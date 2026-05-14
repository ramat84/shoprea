import { useForm } from "react-hook-form"
import { Button } from "../../Elements/Button"
import { Checkbox } from "../../Form/Checkbox"

export const Cash = () => {
    const form = useForm()
    // const approved=watch('approved')

    const onSubmit = () => {
    }

    return (
        <>
            <h1>Pay in cash</h1>
            <h2>Approve payment in store</h2>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset>
                {/*<input id="approved" {...register('approved', {required: true})} type="checkbox" />*/}
                    <Checkbox name="approved" form={form}/>
                    <label htmlFor="approved">I will pick up the order manually</label>
                </fieldset>
                <Button type="action"><i>󰒊</i> Send order</Button>
            </form>
        </>
    )
}
