import { useContext, useEffect, useState, type ChangeEvent } from "react"
import { InputSelect } from "./InputSelect"
import type { InputProps } from "../../types/InputProps";
import { useFormContext } from "react-hook-form";

export const Input = (props: InputProps) => {
    const { name, label, icon = '', values = [], callback = false, register = {} }: InputProps = props;

    const formContext = useFormContext()
    const { formState: { errors }, setValue } = formContext

    const inputStates = {
        selected: useState(''),
        value: useState(''),
        form: formContext
    }

    const [selectedText, setSelectedText] = inputStates.selected

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.name, e.target.value)
        setValue(e.target.name, e.target.value)

        register.onChange && register.onChange(e)
    }

    return (
        <fieldset className="inputText">
            {icon && <i>{icon}</i>}
            <input
                id={name}
                name={name}
                className="input"
                type={values.length ? 'hidden' : 'text'}
                onChange={onChange}
                {...register}
            />

            <InputSelect inputStates={inputStates} inputProps={props} />

            <label htmlFor={name}>{label}</label>

            {errors[name] && <div className="error">{errors[name].message}</div>}
        </fieldset>
    )
}
