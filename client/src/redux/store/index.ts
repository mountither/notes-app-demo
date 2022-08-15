import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore, getDefaultMiddleware, } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import TextEditorSlice from '../slices/TextEditorSlice';
import UserAuthSessionSlice from '../slices/UserAuthSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ["userAuth", "textEditor"]
};
const reducers = combineReducers({
    userAuth: UserAuthSessionSlice,
    textEditor: TextEditorSlice
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ["persist/PERSIST"],
        }
    }),
});

export default store;
