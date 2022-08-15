import axios from "axios"
import { getUserData } from "../../redux/slices/UserAuthSlice";
import store from '../../redux/store/index';



const SIGNUP_ENDPOINT = "/auth/signup/"

const SIGNIN_ENDPOINT = "/auth/signin/"

const SIGNOUT_ENDPOINT = "/auth/signout/"


export const registerUser = async ({
    username,
    password
}: {
    username: string,
    password: string,
}) => {
    try {
        const payload = { username, password }

        const response = await axios.post(`${SIGNUP_ENDPOINT}`, payload)
        const { token, user } = response.data;

        axios.defaults.headers.common.Authorization = `Token ${token}`;

        console.log(token, user);

        return { token }

    } catch (error: any) {
        throw Error(error.message)
    }

}

export const signInUser = async ({
    username,
    password
}: {
    username: string,
    password: string,
}) => {
    try {
        const payload = { username, password }

        const response = await axios.post(`${SIGNIN_ENDPOINT}`, payload)
        const { token, user } = response.data;

        axios.defaults.headers.common.Authorization = `Token ${token}`;

        console.log(token, user);
        return { token }

    } catch (error: any) {
        throw Error(error.message)
    }

}

export const signOutUser = async () => {
    try {
        // console.log(axios.defaults.headers.common.Authorization)
        const state = store.getState();
        const { token } = getUserData(state) || {};

        if (!token) throw Error("failed-login")

        console.log(token)

        axios.defaults.headers.common.Authorization = `Token ${token}`;

        await axios.get(SIGNOUT_ENDPOINT)

        axios.defaults.headers.common.Authorization = false

    } catch (error: any) {
        throw Error(error.message)
    }
}