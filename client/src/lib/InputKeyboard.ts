import type { KeyboardEvent } from "react"

export const InputKeyboard = (e: KeyboardEvent<HTMLInputElement>, inputStates: any, callback: Function) => {
    const [selectedText, setSelectedText] = inputStates.selected
    const [inputText, setInputText] = inputStates.input
    const [selectedValue, setSelectedValue] = inputStates.value

    const SelectValue = (target: HTMLOptionElement | HTMLSelectElement) => {
        const selectedOption: HTMLOptionElement = (target.tagName == "OPTION")
            ? target as HTMLOptionElement
            : (target as HTMLSelectElement).selectedOptions[0]

        setSelectedText(selectedOption.text)
        setSelectedValue(selectedOption.value)
        setInputText('')

        if (callback)
            callback(selectedOption.value)
    }

    const selectSelector = `select[name=${(e.target as HTMLInputElement).name}_value]`;

    switch (e.key) {
        case 'Enter':
            const selectElement: HTMLSelectElement = document.querySelector(selectSelector)!

            if (!selectElement) return

            SelectValue(selectElement);
            selectElement.focus();
            break;

        case 'ArrowDown':
            const nextOption: (HTMLOptionElement | null) = document.querySelector(selectSelector + " option:checked ~ option")
            nextOption && SelectValue(nextOption)
            break;

        case 'ArrowUp':
            const prevOption: (HTMLOptionElement | null) = document.querySelector(selectSelector + " option:has(+option:checked)")
            prevOption && SelectValue(prevOption)
            break;
    }
}

