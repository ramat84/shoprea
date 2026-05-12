type params = {title: string}
export const Subheader = ({title} : params) => {
    return (
        <div className="subheader">
            <h1>{title}</h1>
        </div>
    )

}
