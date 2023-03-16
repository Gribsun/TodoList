import {createSlice} from '@reduxjs/toolkit';

interface IAuth {
    isAuth: boolean,
}

const initialState: IAuth = {
    isAuth: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state) {
            state.isAuth = true;
        },
        removeAuth(state) {
            state.isAuth = false;
        },
    },
});

export const {setAuth, removeAuth} = authSlice.actions;

export default authSlice.reducer;
