import { useContext, useEffect, useState, type ChangeEvent } from "react"
import { InputSelect } from "./InputSelect"
import type { InputProps } from "../../types/InputProps";
import { useFormContext } from "react-hook-form";

export const Input = (props: InputProps) => {
    const { isEnabled = true, name, label, icon = '', values = [], callback = false, register = {}, emptyOn = null }: InputProps = props;

    const { formState: { errors }, setValue } = useFormContext()

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        register.onChange && register.onChange(e)
        setValue(e.target.name, e.target.value)
    }

    if (emptyOn)
        useEffect(() => {
            setValue(name, '')
        }, emptyOn)

    return (
        <fieldset className="inputText" data-disabled={!isEnabled} >
            {icon && <i>{icon}</i>}
            <input
                id={name}
                name={name}
                className="input"
                type={values.length ? 'hidden' : 'text'}
                onKeyDown={onChange}
                {...register} />

            <InputSelect inputProps={props} />

            <label htmlFor={name}>{label}</label>

            {errors[name] && <div className="error">{errors[name].message}</div>}
        </fieldset>
    )
}
