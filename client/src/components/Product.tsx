import { ProductButtons } from "./ProductButtons";
import type { ProductType } from '../interfaces/ProductType'

export const Product = ({ product }: { product: ProductType }) => (
    <div className="product" >
        <div className="image">
            <img src={product.image} alt={product.title} />
        </div>
        <div className="title">{product.title}</div>
        <div className="short">{product.shortDesc}</div>
        <div className="price">{product.price}$</div>
        <ProductButtons product={product} />
    </div>
)
