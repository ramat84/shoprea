import { Link } from 'react-router-dom';
import { useBasket } from '../../contexts/BasketContext';
import type { Dispatch } from 'react';

export const SubHeader = ({setPopup} : {setPopup : Dispatch<boolean>}) => {
    const { IsBasketEmpty } = useBasket()

    return (
        <div className="subheader">
            <h2>Cart</h2>
            {IsBasketEmpty() && <Link to="/" className='action btn'>Continue Shopping</Link>}
            {!IsBasketEmpty() && (
                <button className="btn view" onClick={() => setPopup(true)}>
                    <i></i> Continue to Checkout
                </button>
            )}
        </div>
    )
}
