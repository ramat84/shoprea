export const Price = ({ price }: { price: number }) => {
    const formatter = new Intl.NumberFormat('en-US')

    return (
        <>
            ${formatter.format(price)}
        </>
    )
}
