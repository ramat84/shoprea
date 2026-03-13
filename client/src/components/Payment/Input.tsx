import { useContext, useEffect, useState } from "react"
import { FormContext } from '../../contexts/FormContext'
import { InputSelect } from "./InputSelect"
import type { InputProps } from "../../types/InputProps";

export const Input = (props: InputProps) => {
    const { name, label, values = [], callback = false }: InputProps = props;

    const inputStates = {
        selected: useState(''),
        input: useState('')
    }

    const [selectedText, setSelectedText] = inputStates.selected
    const [inputText, setInputText] = inputStates.input

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useContext(FormContext)
    const _$ = (s: string) => document.querySelector(s);

    const SelectValue = ({ target }) => {
        const selectedOption = (target.tagName == "OPTION") ? target : target.selectedOptions[0]

        setSelectedText(selectedOption.text)
        setInputText('')

        if (callback)
            callback(selectedOption.value)
    }

    const KeyDown = (e) => {
        const selectSelector = `select[name=${e.target.name}_value]`;

        switch (e.key) {
            case 'Enter':
                const selectElement = _$(selectSelector)

                SelectValue({ target: selectElement });
                selectElement.focus();
                break;

            case 'ArrowDown':
                const nextOption = _$(selectSelector + " option:checked ~ option")
                nextOption && setSelectValue(nextOption.value)
                break;

            case 'ArrowUp':
                const prevOption = _$(selectSelector + " option:has(+option:checked)")
                prevOption && setSelectValue(prevOption.value)
                break;
        }
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
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={KeyDown} />

            <InputSelect inputStates={inputStates} inputProps={props} />
        </fieldset>
    )
}
