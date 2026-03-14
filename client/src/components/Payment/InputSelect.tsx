import type { InputProps } from "../../types/InputProps";

export const InputSelect = ({ inputStates, inputProps }: { inputStates: any, inputProps: InputProps }) => {
    const { name, label, values = [], callback = false }: { name: string, label: string, values: any, callback?: any } = inputProps;

    const [selectedText, setSelectedText] = inputStates.selected
    const [selectedValue, setSelectedValue] = inputStates.value
    const [inputText, setInputText] = inputStates.input

    const SelectValue = ({ target }) => {
        const selectedOption = (target.tagName == "OPTION") ? target : target.selectedOptions[0]

        setSelectedText(selectedOption.text)
        setInputText('')

        if (callback)
            callback(selectedOption.value)
    }

    const Options = () => {
        return values.map((value) => {
            const show = (inputText == '' || value.name.toLowerCase().indexOf(inputText.toLowerCase()) >= 0)
            return show && (<option key={value.code} value={value.code}>{value.name}</option>)
        })
    }

    if (values.length == 0)
        return <></>

    return (
        <select name={name + '_value'} size={5} onChange={SelectValue} onClick={SelectValue} value={selectedValue}>
            <Options key={name} />
        </select>
    )
}

