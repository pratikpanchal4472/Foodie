import axios from "axios";

const apiRoute = `${process.env.REACT_APP_API_SERVER}/users`;


export async function saveUser(payload) {
    try {
        const { data } = await axios.post(`${apiRoute}`, payload);
        return Promise.resolve(data);
    } catch (e) {
        return Promise.reject();
    }
}