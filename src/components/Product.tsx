import { Link } from "react-router";
import { ProductButtons } from "./ProductButtons";

export const Product = ({ image, title, shortDesc, price, id }: { image: string, title: string, shortDesc: string, price: number, id: number }) => (
    <Link to={`/p/${id}/${title}`} className="product">
        <div className="image">
            <img src={image} alt={title} />
        </div>
        <div className="title">{title}</div>
        <div className="short">{shortDesc}</div>
        <div className="price">{price}$</div>
        <ProductButtons productID={id} />
    </Link>
)
