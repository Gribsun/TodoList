import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ListType = {
    listId: string,
    title: string,
    isEdit: boolean,
}

export type TodoListsType = Array<ListType> | [];

export type TodoListsStateType = {
    todoLists: TodoListsType,
}

const initialState: TodoListsStateType = {
    todoLists: [],
};

const todoListsSlice = createSlice({
        name: 'todoLists',
        initialState,
        reducers: {
            listsReceived(state, action: PayloadAction<TodoListsType>) {
                state.todoLists = [...action.payload];
            },
            statusHasBeenChanged(state, action: PayloadAction<string>) {
                state.todoLists = state.todoLists.map(item =>
                    item.listId === action.payload
                        ? {
                            ...item,
                            isEdit: !item.isEdit,
                        }
                        : item
                );
            },
            listsCleared(state) {
                state.todoLists = [];
            },
        }
    }
)

export const {listsReceived, statusHasBeenChanged, listsCleared} = todoListsSlice.actions;

export default todoListsSlice.reducer;
