import type { Dispatch, SetStateAction } from 'react'

import { useModal } from '../../contexts/ModalContext'
import { Checkout } from './../../pages/Checkout'

import { BasketProducts } from './BasketProducts'
import { BasketTotal } from './BasketTotal'
import { BasketHeader } from './BasketHeader'

export const BasketContents = ({showPopup, setPopup} : {showPopup : boolean , setPopup : Dispatch<SetStateAction<boolean>>} ) => {
    const { ModalPortal } = useModal()

    return (
        <div className="basketPage page-contents">
            <div className="basketProducts">
                <BasketHeader />
                <BasketTotal />
                <BasketProducts allowChange={true} />
            </div>

            <ModalPortal isOpen={showPopup} setIsOpen={setPopup}>
                <Checkout />
            </ModalPortal>
        </div>
    )
}
