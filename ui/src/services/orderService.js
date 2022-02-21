import axios from "axios";

const apiRoute = `${process.env.REACT_APP_API_SERVER}/orders`;

export async function createOrder(payload) {
    try {
        const { data } = await axios.post(`${apiRoute}`, payload);
        return Promise.resolve(data);
    } catch (e) {
        return Promise.reject();
    }
}