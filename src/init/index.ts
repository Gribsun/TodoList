import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import listsReducer from './slices/listsSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        listsCollection: listsReducer,
        auth: authReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
