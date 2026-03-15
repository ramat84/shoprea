import { type ChangeEvent, type MouseEvent, useState } from 'react'
import { useFormContext } from "react-hook-form";
import type { InputProps } from "../../types/InputProps";
import { InputKeyboard } from '../../lib/InputKeyboard.ts'

export const InputSelect = ({ inputStates, inputProps }: { inputStates: any, inputProps: InputProps }) => {
    const { name, label, values = [], callback = false }: { name: string, label: string, values: any, callback?: any } = inputProps;

    const [selectedText, setSelectedText] = inputStates.selected
    const [inputValue, setInputValue] = inputStates.value
    const [filterValue, setFilterValue] = useState('')

    const { formState: { errors }, setValue } = useFormContext()

    const SelectValue = (e: ChangeEvent | MouseEvent) => {
        const target = e.target as Element

        const selectedOption: HTMLOptionElement =
            (e.target as HTMLSelectElement | HTMLOptionElement).tagName == "OPTION"
                ? target as HTMLOptionElement
                : (target as HTMLSelectElement).selectedOptions[0]

        setSelectedText((selectedOption).text)
        // setInputValue(selectedOption.value)
        setValue(name, selectedOption.value)
        setFilterValue('')

        if (callback)
            callback(selectedOption.value)
    }

    const Options = () => {
        return values.map((value: { code: string, name: string }) => {
            const show = (filterValue == '' || value.name.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0)
            return show && (<option key={value.code} value={value.code}>{value.name}</option>)
        })
    }

    if (values.length == 0)
        return <></>

    return (
        <>
            <input
                className="filter"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                onKeyDown={(e) => { InputKeyboard(e, name, inputStates, callback) }}
            />
            <select
                name={name + '_value'}
                size={5}
                onChange={(e) => SelectValue(e)}
                onClick={(e) => SelectValue(e)}
                value={inputValue}>
                <Options key={name} />
            </select>
            <div className="selected-text">{selectedText}</div>
        </>
    )
}

