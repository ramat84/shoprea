import { useContext, useEffect, useState, type ChangeEvent } from "react"
import { InputSelect } from "./InputSelect"
import type { InputProps } from "../../types/InputProps";
import { InputKeyboard } from '../../lib/InputKeyboard.ts'
import { useFormContext } from "react-hook-form";

export const Input = (props: InputProps) => {
    const { name, label, values = [], callback = false, register = {} }: InputProps = props;

    const inputStates = {
        selected: useState(''),
        value: useState(''),
        input: useState('')
    }

    const [selectedText, setSelectedText] = inputStates.selected
    const [inputText, setInputText] = inputStates.input

    const { formState: { errors } } = useFormContext()

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value)

        register.onChange && register.onChange(e)
    }

    return (
        <fieldset className="inputText">
            <label htmlFor={name}>{label}</label>
            <input
                type="text"
                id={name}
                name={name}
                value={inputText}
                required={selectedText == ''}
                placeholder={selectedText}
                onChange={onChange}
                onKeyDown={(e) => InputKeyboard(e, inputStates, callback)}
                onBlur={register.onBlur ?? null}
                ref={register.ref ?? null}
            />

            <InputSelect inputStates={inputStates} inputProps={props} />

            {errors[name] && <div className="error">{errors[name].message}</div>}
        </fieldset>
    )
}
