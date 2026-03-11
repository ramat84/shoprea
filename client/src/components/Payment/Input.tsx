import { useEffect, useState } from "react"

export const Input = ({ name, label, values = [] }: { name: string, label: string, values: any }) => {
    const [filter, setFilter] = useState('')
    const [valueText, setValueText] = useState('')
    const [inputValue, setInputValue] = useState('')

    const SelectValue = ({ target }) => {
        const selectedSelect = target
        const selectedOption = selectedSelect.selectedOptions[0]
        setValueText(selectedOption.text)
        setInputValue('')
    }

    const UpdateInputValue = () => {
        setFilter(event.target.value)
        setInputValue(event?.target.value)
    }

    const KeyUp = (e) => {
        const selectSelector = `select[name=${e.target.name}_value]`;

        switch (e.key) {

            case 'Enter':
                const selectElement = document.querySelector(selectSelector)

                SelectValue({ target: selectElement });
                selectElement.focus();
                break;

            case 'ArrowDown':
                const nextOption = document.querySelector(selectSelector + " option:checked ~ option")
                if (nextOption) {
                    nextOption.selected = true;
                }
                break;

            case 'ArrowUp':
                const prevOption = document.querySelector(selectSelector + " option:has(+option:checked)")
                if (prevOption) {
                    prevOption.selected = true;
                }
                break;
        }
    }

    const Options = () => {
        let isFirst = true;
        return values.map((value) => {
            const show = (filter == '' || value.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
            const selected = show && isFirst;
            if (selected) isFirst = false;
            return show && (
                <option
                    key={value.code}
                    value={value.code}
                    selected={selected}>
                    {value.name}
                </option>
            )
        })
    }

    return (
        <fieldset className="inputText">
            <label htmlFor={name}>{label}</label>
            <input
                type="text"
                id={name}
                name={name}
                value={inputValue}
                required={valueText == ''}
                placeholder={valueText}
                onChange={UpdateInputValue}
                onKeyUp={KeyUp}
            />
            {values.length > 0 && (
                <select name={name + '_value'} size="5" onChange={SelectValue} >
                    <Options />
                </select>
            )}
        </fieldset>
    )
}
