import { useContext, useEffect, useState } from "react"
import { FormContext } from '../../contexts/FormContext'
import { InputSelect } from "./InputSelect"
import type { InputProps } from "../../types/InputProps";
import { InputKeyboard } from '../../lib/InputKeyboard.ts'

export const Input = (props: InputProps) => {
    const { name, label, values = [], callback = false }: InputProps = props;

    const inputStates = {
        selected: useState(''),
        value: useState(''),
        input: useState('')
    }

    const [selectedText, setSelectedText] = inputStates.selected
    const [inputText, setInputText] = inputStates.input

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useContext(FormContext)

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
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => InputKeyboard(e, inputStates, callback)} />

            <InputSelect inputStates={inputStates} inputProps={props} />
        </fieldset>
    )
}
