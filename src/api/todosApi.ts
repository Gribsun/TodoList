// core
import {collection, onSnapshot, query} from 'firebase/firestore';
import {AppDispatch} from '../init';
import {database} from '../firebase';
import {todosReceived, TodosType} from '../init/slices/todosSlice';
import {initializationDone} from '../init/slices/appSLice';

export const getTodos = (dispatch: AppDispatch, userId: string | null, id: string | undefined) => {
    const q = query(collection(database, `users/${userId}/todolists/${id}/todos`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let todos: TodosType = [];
        querySnapshot.forEach((doc) => {
            //@ts-ignore
            todos.push({
                todoId: doc.id,
                isEdit: false,
                ...doc.data()
            })
        })
        dispatch(todosReceived(todos));
        dispatch(initializationDone());
    });
    return () => unsubscribe();
}
