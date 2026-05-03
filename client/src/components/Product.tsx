import { ProductButtons } from "./ProductButtons";
import type { Product } from '../generated/prisma/client';
import { Price } from "./Price";
import { useState } from "react";

export const ProductComponent = ({ product }: { product: Product }) => {
    const [effect, setEffect] = useState<string>('');

    return <div className={'product ' + effect}>
        <div className="image">
            <img src={product.image} alt={product.title} />
        </div>
        <div className="title">{product.title}</div>
        <div className="short">{product.shortDesc}</div>
        <div className="price">
            <Price price={product.price} />
        </div>
        <ProductButtons product={product} setEffect={setEffect} />
    </div>
}
