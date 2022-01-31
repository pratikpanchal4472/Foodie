import axios from "axios";

const apiRoute = `${process.env.REACT_APP_API_SERVER}/auth`;

export async function authenticate(payload) {
    try {
        const { data } = await axios.post(`${apiRoute}/login`, payload);
        return Promise.resolve(data);
    } catch (e) {
        return Promise.reject();
    }
}

export async function session() {
    try {
        const { data } = await axios.get(`${apiRoute}/session`);
        return Promise.resolve(data);
    } catch (e) {
        return Promise.reject();
    }
}