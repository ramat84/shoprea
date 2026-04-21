import { type ChangeEvent, type MouseEvent, useState } from 'react'
import { useFormContext } from "react-hook-form";
import type { InputProps } from "../../types/InputProps";
import { InputKeyboard } from '../../lib/InputKeyboard.ts'

export const InputSelect = ({ inputProps }: { inputProps: InputProps }) => {
    const { name, label, isEnabled = true, values = [], callback = false } = inputProps;

    const inputStates = {
        selected: useState(''),
        value: useState(''),
    }

    const [selectedText, setSelectedText] = inputStates.selected
    const [inputValue, setInputValue] = inputStates.value
    const [filterValue, setFilterValue] = useState('')

    const { setValue } = useFormContext()

    const ChangeValue = (option: HTMLOptionElement) => {
        setSelectedText(option.text)
        setValue(name, option.value)
        setFilterValue('')

        if (callback)
            callback(option.value)
    }

    const SelectValue = (e: ChangeEvent | MouseEvent) => {
        const target = e.target as Element

        const selectedOption: HTMLOptionElement =
            (e.target as HTMLSelectElement | HTMLOptionElement).tagName == "OPTION"
                ? target as HTMLOptionElement
                : (target as HTMLSelectElement).selectedOptions[0]

        ChangeValue(selectedOption)
    }

    const Options = ({ name }: { name: string }) => {
        return <>
            {
                filterValue != '' &&
                values.map((value: { code: string, name: string }) => {
                    const pos = value.name.toLowerCase().indexOf(filterValue.toLowerCase())

                    return pos == 0 && (
                        <option key={'selval' + name + value.code} value={value.code}>
                            {value.name}
                        </option>
                    )
                })
            }
            {
                values.map((value: { code: string, name: string }) => {
                    const pos = value.name.toLowerCase().indexOf(filterValue.toLowerCase())
                    const show = (filterValue == '' || pos > 0)
                    return show && (<option key={value.code} value={value.code}>{value.name}</option>)
                })
            }
        </>
    }

    if (values.length == 0)
        return <></>

    return (
        <>
            <input
                className="filter"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                onKeyDown={(e) => { InputKeyboard(e, name, inputStates, ChangeValue) }} />
            <select
                name={name + '_value'}
                size={5}
                onChange={(e) => SelectValue(e)}
                onClick={(e) => SelectValue(e)}
                value={inputValue}>
                <Options name={name} />
            </select>
            <div className="selected-text">{selectedText}</div>
        </>
    )
}
