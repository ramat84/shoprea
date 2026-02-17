import { Link } from "react-router";

export const Product = ({ image, title, shortDesc, price, id }: { image: string, title: string, shortDesc: string, price: number, id: number }) => (
    <Link to={`/p/${id}/${title}`} className="product">
        <div className="image">
            <img src={image} alt={title} />
        </div>
        <div className="title">{title}</div>
        <div className="short">{shortDesc}</div>
        <div className="price">{price}$</div>
        <div className="cta">
            <button className="btn-view"><i>󰈈</i> View</button>
            <button className="btn-add"><i></i> Add to cart</button>
        </div>
    </Link>
)
