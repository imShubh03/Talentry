import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js"; // Import the auth reducer
import jobSlice from "./jobSlice.js"; // Import the job reducer

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Persist configuration
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

// Combine reducers
const rootReducer = combineReducers({
    auth: authSlice, // Correctly map auth reducer
    job: jobSlice,   // Correctly map job reducer
});

// Persist the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;
