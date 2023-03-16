import {createSlice} from '@reduxjs/toolkit';

interface IList {
    id: number,
    title: string,
    tasks: {
        indefinite: [],
        atWork: [],
        complete: [],
    }
}

type ListsType = {
    lists: IList[],
}

const initialState: ListsType = {
    lists: [],
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {

    },
});

export const {} = todosSlice.actions;

export default todosSlice.reducer;
