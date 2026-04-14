import { useState, type ChangeEvent } from "react"

const Row = ({ label, input }) => (
    <div className="row">
        <div className="col3"><label>{label}</label></div>
        <div className="col7">
            {input}
        </div>
    </div>
)

export const SelectRow = ({ name, label, form, values, value }) => {
    const Input = (
        <select {...form.register(name)} defaultValue={value}>
            {values.map((val) => (<option key={val.id} value={val.id}>{val.name}</option>))}
        </select >
    )

    return <Row input={Input} label={label} />
}

export const InputRow = ({ name, label, form, value }) => {
    const Input = <input {...form.register(name)} defaultValue={value} />
    return <Row input={Input} label={label} />
}

export const TextareaRow = ({ name, label, form, value }) => {
    const Input = <textarea {...form.register(name)} defaultValue={value} />
    return <Row input={Input} label={label} />
}

export const FileRow = ({ form, name }) => {
    const submitButton = (
        <div>
            <input {...form.register(name)} type="file" />
        </div>
    )

    return <Row label="" input={submitButton} />
}

export const SubmitRow = ({ value }) => {
    const submitButton = <button className="btn-submit">{value}</button>
    return <Row label="" input={submitButton} />
}
