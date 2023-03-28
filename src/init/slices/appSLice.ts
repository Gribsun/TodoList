import {createSlice} from '@reduxjs/toolkit';

interface IInitialized {
    isInitialized: boolean,
}

const initialState: IInitialized = {
    isInitialized: false,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        initializationDone(state) {
            state.isInitialized = true;
        },
        initializationCanceled(state) {
            state.isInitialized = false;
        }
    },
});

export const {initializationDone, initializationCanceled} = appSlice.actions;

export default appSlice.reducer;
