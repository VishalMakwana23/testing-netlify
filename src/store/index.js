
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import menuReducer from "../reducers/menu"
import loginReducer from "../reducers/login"
import CommonReducer from '../reducers/Common';
import languageReducer from '../reducers/language';


const reducers = combineReducers({
    login: loginReducer,
    headerMenu: menuReducer,
    Common: CommonReducer,
    language:languageReducer
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

export default store;
