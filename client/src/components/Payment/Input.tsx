export const Input = ({ name, label }: { name: string, label: string }) => (
    <fieldset className="inputText">
        <label htmlFor={name}>{label}</label>
        <input type="text" id={name} name={name} required />
    </fieldset>
)
