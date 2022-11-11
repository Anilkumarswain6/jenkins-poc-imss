/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./userSagas";
import finalDataReducer from "./usersSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const reducer = combineReducers({
    userData: finalDataReducer
})
const persistedReducer = persistReducer(persistConfig, reducer)
let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export default store;
