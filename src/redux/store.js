// store.js or redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import dropReducer from "./dropSlice"; // your existing reducer
import { combineReducers } from "redux";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  drop: dropReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
