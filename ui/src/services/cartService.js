import axios from "axios";

const apiRoute = `${process.env.REACT_APP_API_SERVER}/cart`;


export async function addOrUpdateItem(payload) {
    try {
        await axios.post(`${apiRoute}/addorupdate`, payload);
        return Promise.resolve();
    } catch (e) {
        return Promise.reject();
    }
}


export async function updateOrderItem(id, payload) {
    try {
        const { data } = await axios.put(`${apiRoute}/${id}`, payload);
        return Promise.resolve(data);
    } catch (e) {
        return Promise.reject();
    }
}

export async function removeCartItem(id) {
    try {
        const { data } = await axios.delete(`${apiRoute}/${id}`);
        return Promise.resolve(data);
    } catch (e) {
        return Promise.reject();
    }
}

export async function currentUserCartItems() {
    try {
        const { data } = await axios.get(`${apiRoute}/items`);
        return Promise.resolve(data);
    } catch (e) {
        return Promise.reject();
    }
}

export async function userCartItemDetails() {
    try {
        const { data } = await axios.get(`${apiRoute}/details`);
        return Promise.resolve(data);
    } catch (e) {
        return Promise.reject();
    }
}