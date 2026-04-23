import axios from "axios";
import type { Items } from "../types/Item";

export const GetProductsByCategory = async (categoryID: number, callback: (data: Items) => void) => {
    let url = 'http://localhost:4000/api/products'
    if (categoryID ?? 0 > 0) url += '/' + categoryID;

    axios.get(url).then((res) => {
        callback(res.data)
    })
}
