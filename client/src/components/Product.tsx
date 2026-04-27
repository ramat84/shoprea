import { ProductButtons } from "./ProductButtons";
import type { BasketProductType } from '../types/BasketProductType'
import { Price } from "./Price";

export const Product = ({ product }: { product: BasketProductType }) => (
    <div className="product" >
        <div className="image">
            <img src={product.image} alt={product.title} />
        </div>
        <div className="title">{product.title}</div>
        <div className="short">{product.shortDesc}</div>
        <div className="price">
            <Price price={product.price} />
        </div>
        <ProductButtons product={product} />
    </div>
)
