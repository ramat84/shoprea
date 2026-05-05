import axios from "axios"
import { useEffect } from "react"
import { useForm, FormProvider } from "react-hook-form"

type UpdateOptionsType = { url: string, set: any, on: any, dep?: any, focus?: string }

export const useShopForm = () => {
    const form = useForm<{ [key: string]: string | number }>()

    const FocusOn = (name: string) => {
        setTimeout(() => {
            (document.querySelector(`input[name=${name}] ~ .filter`) as HTMLInputElement)?.focus()
        }, 50)
    }

    const FocusOnNextInput = () => {
        setTimeout(() => {
            let breakLoop = false;
            document.querySelectorAll('form .input:not([value])')?.forEach((el) => {
                if (!breakLoop && (el as HTMLInputElement).value == "")
                    (breakLoop = true) && (el as HTMLInputElement).focus();
            })
        }, 50)
    }

    const UpdateOptions = ({ url, set, dep = true, focus }: UpdateOptionsType) => {
        if (!dep) return;

        axios.get(url).then((res) => {
            set(res.data ? res.data : [])
        });

        if (focus) FocusOn(focus)
    }

    const SetInputValue = (name: any, value: string) => {
        form.setValue(name, value);
        form.trigger(name)
    }

    const QuickReg = (name: string, label: string) => {
        let pattern = /.*/

        switch (label) {
            case 'email': pattern = /^[A-Za-z0-9.]+@[A-Za-z0-9.]+$/; break
            case 'phone': pattern = /^[\+]?[0-9\-]+$/; break
            case 'zip': pattern = /[0-9]+$/; break
        }

        return {
            name: name,
            label: label,
            register:
                form.register(name, {
                    required: `${label} is required`, pattern: {
                        value: pattern,
                        message: `Enter a valid ${label}`
                    }
                })
        }
    }

    return { FocusOn, FocusOnNextInput, UpdateOptions, form, FormProvider, SetInputValue, QuickReg }
}
