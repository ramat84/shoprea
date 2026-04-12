import { useParams } from "react-router"
import { useForm } from "react-hook-form"
import type { Item } from "../../types/Item"

export const Filter = ({ label, values, callback }) => {
    const { register, setValue, handleSubmit } = useForm()

    const params = useParams()

    if (params.id)
        setValue('filter', params.id)

    return (
        <form>
            <select {...register('filter')} onClick={handleSubmit(callback)}>
                <option value="">{label}</option>
                {values.map((item: Item) => (
                    <option value={item.id}>{item.name}</option>
                ))}
            </select>
        </form>
    )
}
