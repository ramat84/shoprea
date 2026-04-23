import { useParams } from "react-router"
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"
import type { Item } from "../../types/Item"

type LabelCallType = {
    label: string,
    values: Item[],
    callback: SubmitHandler<FieldValues>
}

export const Filter = ({ label, values, callback }: LabelCallType) => {
    const { register, setValue, handleSubmit } = useForm()

    const params = useParams()

    if (params.id)
        setValue('filter', params.id)

    return (
        <form>
            <select {...register('filter')} onClick={handleSubmit(callback)}>
                <option value="">{label}</option>
                {values.map((item: Item) => (
                    <option key={'filter' + label + item.id} value={item.id}>{item.name}</option>
                ))}
            </select>
        </form>
    )
}
