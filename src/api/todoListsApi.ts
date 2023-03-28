// core
import {collection, onSnapshot, query} from 'firebase/firestore';
import {AppDispatch} from '../init';
import {database} from '../firebase';
import {listsReceived, TodoListsType} from '../init/slices/todoListsSlice';
import {initializationDone} from '../init/slices/appSLice';

export const getTodoLists = (dispatch: AppDispatch, id: string | null) => {
    const q = query(collection(database, `users/${id}/todolists`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let todoLists: TodoListsType = [];
        querySnapshot.forEach((doc) => {
            //@ts-ignore
            todoLists.push({
                listId: doc.id,
                isEdit: false,
                ...doc.data()
            })
        })
        dispatch(listsReceived(todoLists));
        dispatch(initializationDone());
    });
    return () => unsubscribe();
}
