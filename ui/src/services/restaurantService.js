import axios from "axios";

const apiRoute = `${process.env.REACT_APP_API_SERVER}/restaurants`;

export async function getRestaurantDetails(id) {
    try {
        const { data } = await axios.get(`${apiRoute}/${id}`);
        return Promise.resolve(data);
    } catch (e) {
        return Promise.reject();
    }
}

export async function getRestaurants() {
    try {
        const { data } = await axios.get(`${apiRoute}`);
        return Promise.resolve(data);
    } catch (e) {
        return Promise.reject();
    }
}