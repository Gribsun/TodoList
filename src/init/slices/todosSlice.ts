import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type TodoType = {
    todoId: string,
    status: boolean,
    text: string,
    isEdit: boolean,
}


export type TodosType = Array<TodoType> | [];

export type TodosStateType = {
    todos: TodosType,
}

const initialState: TodosStateType = {
    todos: [],
};

const todosSlice = createSlice({
        name: 'todos',
        initialState,
        reducers: {
            todosReceived(state, action: PayloadAction<TodosType>) {
                state.todos = [...action.payload];
            },
            statusTodoHasBeenChanged(state, action: PayloadAction<string>) {
                state.todos = state.todos.map(item =>
                    item.todoId === action.payload
                        ? {
                            ...item,
                            isEdit: !item.isEdit,
                        }
                        : item
                );
            },
            todosCleared(state) {
                state.todos = [];
            }
        }
    }
)

export const {todosReceived, statusTodoHasBeenChanged, todosCleared} = todosSlice.actions;

export default todosSlice.reducer;
