import type { UseFormReturn } from "react-hook-form"
import type { Item } from "../../types/Item"

export const Checkbox = ({name, label, form} : {name: string, label: string, form: UseFormReturn<Item>}) => {
    return (
        <fieldset className="checkbox-field">
            <div className="checkbox">
                <input id={name} type="checkbox" {...form.register(name, {required: 'This field is required'})}  />
                <span />
            </div>
            <label htmlFor={name}>{label}</label>
            {form.formState.errors[name] && <div className="error">{form.formState.errors[name].message}</div>}
        </fieldset>
    )

}
