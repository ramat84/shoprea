import { Header } from '../components/Header'
import { GetBasket } from '../contexts/BasketContext'


export const BasketPage = () => {
    const basketEntries = Object.entries(GetBasket())
    console.log(basketEntries)
    return <>
        <Header />
        <h2>Basket</h2>
        {basketEntries.map(([productID, amount]) => <div className="row">Product {productID} : Amount {amount}</div>)}
    </>
}
