import { Link } from "react-router-dom"

export const EmptyBasket = () => {
    return (
        <div className="basket-empty-container">
            <div className="basket-empty">
                <i>󰄑</i>
                Your cart is empty
            </div>
            <div className='center-text'>
                <Link to="/" className='action btn'>Continue Shopping</Link>
            </div>
        </div>
    )
 }
