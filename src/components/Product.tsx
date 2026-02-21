import { ProductButtons } from "./ProductButtons";
import type { ProductInterface } from '../interfaces/ProductInterface'

export const Product = ({ product }: { product: ProductInterface }) => (
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
