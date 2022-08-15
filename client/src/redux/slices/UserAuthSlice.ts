import { createSlice } from '@reduxjs/toolkit';

export type UserData = {
    username: string,
    token: string
}

export type UserAuthProps = {
    data: UserData | undefined,
    isLoading: boolean,
}

const init: UserAuthProps = {
    data: undefined,
    isLoading: true,
};

export const UserAuthSlice = createSlice({
    name: 'userAuth',
    initialState: init,
    reducers: {
        setUser: (state, action) => {
            return {
                ...state,
                data: action.payload,
                isLoading: false,
            };
        },
        removeUser: () => {
            return {
                ...init,
                isLoading: false,
            }
        }
    },
});

export const {
    setUser,
    removeUser,
} = UserAuthSlice.actions;

export type UserAuthState = {
    userAuth: UserAuthProps
}

export const getUserData = (state: UserAuthState) => state.userAuth.data;

export const isUserDataLoading = (state: UserAuthState) => state.userAuth.isLoading;

export default UserAuthSlice.reducer;
