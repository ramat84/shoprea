import { useState, useEffect, useContext } from "react";
import type { ProductType } from "../interfaces/ProductType";
import { BasketContext } from "../contexts/BasketContext";
import { ModalContext } from "../contexts/ModalContext";

export const BasketFooter = ({ showNextButton, products }: { showNextButton: boolean, products: ProductType[] }) => {
    const [total, setTotal] = useState<number>(0)
    const [basket, setBasket] = useContext(BasketContext)

    const [modalIsOpen, setModalIsOpen] = useContext(ModalContext)

    useEffect(() => {
        let total = 0;
        products.forEach((prod: ProductType) => {
            total += prod.price * basket[prod.id]
        })
        setTotal(total)
    }, [basket, products])

    return <div className="row basket-footer" >
        <div className="image">&nbsp;</div>
        <div className="title">&nbsp;</div>
        <div className="desc">
            {!showNextButton && <> </>}
            {showNextButton && <button className="btn next" onClick={() => setModalIsOpen(true)}>
                <i></i> Continue to Checkout
            </button>}
        </div>
        <div className="price">Total:</div>
        <div className="amount">${total}</div>
    </div>
}

