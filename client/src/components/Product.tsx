import { ProductButtons } from "./ProductButtons";
import type { ProductType } from '../types/ProductType'
import { Price } from "./Price";

export const Product = ({ product }: { product: ProductType }) => (
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
