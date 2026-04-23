import { type ChangeEvent, type ReactNode } from "react"
import type { UseFormReturn } from "react-hook-form"
import type { Item } from "../../types/Item"


type FieldType = {
    name: string,
    label?: string,
    value?: string,
    values?: Item[],
    form: UseFormReturn,
    callback?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Row = ({ label, input }: { label: string, input: ReactNode }) => (
    <div className="row">
        <div className="col3"><label>{label}</label></div>
        <div className="col7">
            {input}
        </div>
    </div>
)

export const SelectRow = ({ name, label, form, values, value }: FieldType) => {
    const Input = (
        <select {...form.register(name)} defaultValue={value}>
            {values ? values.map((val) => (<option key={val.id} value={val.id}>{val.name}</option>)) : []}
        </select >
    )

    return <Row input={Input} label={label ?? ''} />
}

export const InputRow = ({ name, label, form, value }: FieldType) => {
    const Input = <input {...form.register(name)} defaultValue={value} />
    return <Row input={Input} label={label ?? ''} />
}

export const TextareaRow = ({ name, label, form, value }: FieldType) => {
    const Input = <textarea {...form.register(name)} defaultValue={value} />
    return <Row input={Input} label={label ?? ''} />
}

export const FileRow = ({ form, name, callback }: FieldType) => {
    const submitButton = (
        <div>
            <input {...form.register(name)} onChange={callback} type="file" />
        </div>
    )

    return <Row label="" input={submitButton} />
}

export const SubmitRow = ({ value }: { value: string }) => {
    const submitButton = <button className="btn-submit">{value}</button>
    return <Row label="" input={submitButton} />
}
