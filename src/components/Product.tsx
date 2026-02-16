export const Product = ({ image, title, shortDesc, price }: { image: string, title: string, shortDesc: string, price: integer }) => (
    <div className="product">
        <img src={image} alt={title} />
        <div className="title">{title}</div>
        <div className="short">{shortDesc}</div>
        <div className="price">{price}$</div>
    </div>
)
