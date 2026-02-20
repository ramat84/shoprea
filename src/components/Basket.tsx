import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router'
import '../css/components/basket.css'
import { BasketContext } from '../contexts/BasketContext'

export const Basket = () => {
    const [basketCount, setBasketCount] = useState()
    const [basket, setBasket] = useContext(BasketContext)

    useEffect(() => {
        const values = Object.values(basket)
        const count: number = values.length == 0 ? 0 : values.reduce((sum, val) => sum += val)
        setBasketCount(count)
    }, [basket])

    return <Link to="/basket" className="basket"><i>󰄑</i> | Items: {basketCount} </Link>
}
