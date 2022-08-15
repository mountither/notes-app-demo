import axios from "axios"
import { getUserData } from "../../redux/slices/UserAuthSlice";
import store from '../../redux/store/index';


const NOTES_LIST = "/notes-list/"

const NOTE_DETAIL = "/note-detail"

const NOTE_CREATE = "/note-create/"

const NOTE_UPDATE = "/note-update"

const NOTE_DELETE = "/note-delete"

// ! writes
export const createNote = async ({ title, content }: { title: string, content: string }) => {
    try {

        const payload = { title, content }

        const response = await axios.post(NOTE_CREATE, payload);

        return response

    } catch (error: any) {
        throw Error(error.message)
    }
}

export const deleteNote = async ({ noteID }: { noteID: string | number }) => {
    try {
        const state = store.getState();
        const { token } = getUserData(state) || {};

        if (!token) throw Error("unauthorised-action")

        axios.defaults.headers.common.Authorization = `Token ${token}`;

        const response = await axios.delete(`${NOTE_DELETE}/${noteID}/`);

        return response.data

    } catch (error: any) {
        throw Error(error.message)
    }
}

export const updateNote = async ({ noteID, title, content }: { noteID: string | number, title: string, content: string, }) => {
    try {

        const payload = { title, content }

        const state = store.getState();
        const { token } = getUserData(state) || {};

        if (!token) throw Error("unauthorised-action")

        axios.defaults.headers.common.Authorization = `Token ${token}`;

        const response = await axios.post(`${NOTE_UPDATE}/${noteID}/`, payload);

        return response.data

    } catch (error: any) {
        throw Error(error.message)
    }
}

// ! reads
export const fetchNotesList = async () => {
    try {
        const state = store.getState();
        const { token } = getUserData(state) || {};

        if (!token) throw Error("unauthorised-action")

        axios.defaults.headers.common.Authorization = `Token ${token}`;

        const response = await axios.get(NOTES_LIST);

        return response.data

    } catch (error: any) {
        throw Error(error.message)
    }
}

export const fetchNote = async ({ noteID }: { noteID: string | number }) => {
    try {
        const state = store.getState();
        const { token } = getUserData(state) || {};

        if (!token) throw Error("unauthorised-action")

        axios.defaults.headers.common.Authorization = `Token ${token}`;

        const response = await axios.get(`${NOTE_DETAIL}/${noteID}/`);

        return response.data

    } catch (error: any) {
        throw Error(error.message)
    }
}


