export const Checkbox = ({name, form} : {name: string, form: any}) => {
    return (
    <div className="checkbox">
        <input type="checkbox" {...form.register(name)} id={name} />
        <span />
    </div>
    )

}
