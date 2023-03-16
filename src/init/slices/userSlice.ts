import {createSlice} from '@reduxjs/toolkit';

interface IUserState {
    userName: null | string,
    email: null | string,
    id: null | string,
}

type ActionPayloadType = {
    payload: {
        displayName: string,
        email: string,
        uid: string,
    }
}

const initialState: IUserState = {
    userName: null,
    email: null,
    id: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: ActionPayloadType) {
            state.userName = action.payload.displayName;
            state.email = action.payload.email;
            state.id = action.payload.uid;
        },
        removeUser(state) {
            state.userName = null;
            state.email = null;
            state.id = null;
        },
    },
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
