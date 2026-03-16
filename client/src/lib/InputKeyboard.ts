import type { KeyboardEvent } from "react"

export const InputKeyboard = (
    e: KeyboardEvent<HTMLInputElement>,
    fieldName: string,
    inputStates: any,
    callback: Function) => {

    const [selectedText, setSelectedText] = inputStates.selected
    const [selectedValue, setSelectedValue] = inputStates.value

    const SelectValue = (target: HTMLOptionElement | HTMLSelectElement) => {
        const selectedOption: HTMLOptionElement = (target.tagName == "OPTION")
            ? target as HTMLOptionElement
            : (target as HTMLSelectElement).selectedOptions[0]

        callback(selectedOption)
    }

    const selectSelector = `select[name=${fieldName}_value]`;

    switch (e.key) {
        case 'Enter':
            const selectElement: HTMLSelectElement = document.querySelector(selectSelector)!

            if (!selectElement) return

            SelectValue(selectElement);
            selectElement.focus();
            break;

        case 'ArrowDown':
            console.log(selectSelector + " option:checked ~ option")
            const nextOption: (HTMLOptionElement | null) = document.querySelector(selectSelector + " option:checked ~ option")
            nextOption && setSelectedValue(nextOption.value)
            break;

        case 'ArrowUp':
            const prevOption: (HTMLOptionElement | null) = document.querySelector(selectSelector + " option:has(+option:checked)")
            prevOption && setSelectedValue(prevOption.value)
            break;
    }
}

