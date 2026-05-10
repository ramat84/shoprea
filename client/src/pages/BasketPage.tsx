import { useEffect, useState } from 'react';
import { useBasket } from '../contexts/BasketContext';
import { EmptyBasket } from '../components/Basket/EmptyBasket';
import { SubHeader } from '../components/Basket/SubHeader';
import { BasketContents } from '../components/Basket/BasketContents';

import '../css/pages/basket.css'

export const BasketPage = () => {
    const { GetBasketProducts, IsBasketEmpty } = useBasket()
    const [showPopup, setPopup] = useState(false)

    useEffect( GetBasketProducts, [])

    return <>
        <SubHeader setPopup={setPopup}/>
        <div className="page-contents">
            {!IsBasketEmpty() && <BasketContents setPopup={setPopup} showPopup={showPopup} />}
            {IsBasketEmpty() && <EmptyBasket />}
        </div>
    </>
}

export default BasketPage
