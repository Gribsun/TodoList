import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import todoListsReducer from './slices/todoListsSlice';
import todosReducer from './slices/todosSlice';
import appReducer from './slices/appSLice';

export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        user: userReducer,
        listsCollection: todoListsReducer,
        todosCollection: todosReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
