import axios from "axios";

export const GetProductsByCategory = async (categoryID, callback) => {
    let url = 'http://localhost:4000/api/products'
    if (categoryID ?? 0 > 0) url += '/' + categoryID;

    axios.get(url).then((res) => {
        callback(res.data)
    })
}
