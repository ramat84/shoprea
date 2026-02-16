export const Product = ({ image, title, shortDesc, price }: { image: string, title: string, shortDesc: string, price: number }) => (
    <div className="product">
        <div className="image">
            <img src={image} alt={title} />
        </div>
        <div className="title">{title}</div>
        <div className="short">{shortDesc}</div>
        <div className="price">{price}$</div>
        <button><i></i> Add to cart</button>
    </div>
)
