import { useEffect, useState } from "react"
import { useModal } from '../../contexts/ModalContext'

import { Input } from "./Input";
import { useShopForm } from "../../contexts/ShopForm";
import { PaymentMethods } from "./PaymentMethods";
import { Country } from "./Fields/Country";
import { State } from "./Fields/State";
import { City } from "./Fields/City";

export const ShipmentForm = () => {
    const { ModalPortal } = useModal()
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const shopForm = useShopForm();
    const { FocusOnNextInput, form, FormProvider, QuickReg } = shopForm;

    const city = form.watch('city')
    useEffect(() => { FocusOnNextInput() }, [city])

    const onSubmit = () => {
        // if (payType == 'paypal')
        // setModalContent(<Paypal />)
        return true
    }

    return <>
        <h2>Shipping</h2>
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="inputs">
                    <Country shopForm={shopForm} />
                    <State shopForm={shopForm} />
                    <City shopForm={shopForm} />
                    <Input icon="󰶈" {...QuickReg('zip', 'Zip Code')} />
                    <Input icon="" {...QuickReg('address', 'Address')} doubleWidth={true} />
                    <Input icon="" {...QuickReg('phone', 'Phone Number')} />
                    <Input icon="󰇰" {...QuickReg('email', 'Email Address')} />
                </div>

                <PaymentMethods />
            </form>
        </FormProvider>

        <ModalPortal isOpen={modalOpen} setIsOpen={setModalOpen}>
            <div>Hello</div>
        </ModalPortal>
    </>
}
