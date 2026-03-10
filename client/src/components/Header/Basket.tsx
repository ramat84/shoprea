import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router'
import '../../css/components/basket.css'
import { BasketContext } from '../../contexts/BasketContext'

export const Basket = () => {
    const [basketCount, setBasketCount] = useState<number>(0)
    const [basketAmounts, setBasketAmounts] = useContext(BasketContext).amounts

    useEffect(() => {
        const values = Object.values(basketAmounts)
        const count: number = values.length == 0 ? 0 : values.reduce((sum, val) => sum += val)
        setBasketCount(count)
    }, [basketAmounts])

    return <Link to="/basket" className="basket"><i>󰄑</i> &nbsp; {basketCount} </Link>
}
