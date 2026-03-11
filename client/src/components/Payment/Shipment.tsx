import { Input } from "./Input";

export const Shipment = () => (
    <form>
        <Input name="country" label="Country" />
        <Input name="city" label="City" />
        <Input name="address" label="Address" />
        <Input name="phone" label="Phone Number" />
        <Input name="email" label="Email Address" />
        <Input name="zip" label="Zip Code" />
        {/* TODO: Method  */}
    </form>
)
