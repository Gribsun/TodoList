// core
import React, {FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import {getAuth, signOut} from 'firebase/auth';

// components
import {TodoList} from "./TodoList/TodoList";

// other
import {removeUser} from '../../init/slices/userSlice';
import {removeAuth} from '../../init/slices/authSlice';

export const Main: FC = () => {
    const dispatch = useAppDispatch();
    const {userName} = useAppSelector(state => state.user);
    const [inputValue, setInputValue] = useState('');

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            dispatch(removeAuth());
            dispatch(removeUser());
        }).catch((error) => {
        });
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const handleAddList = () => {
        const id = Math.ceil(Math.random() * 100 + Math.random() * 100);
        const tasks = {
            indefinite: [],
            atWork: [],
            complete: [],
        }
        // dispatch(setList({title: inputValue, id, tasks}));
    }
    const {lists} = useAppSelector(store => store.listsCollection);

    return (
        <div>
            <div>Списки</div>
            {lists.length
                ? <div>
                    {lists.map(list =>
                        <TodoList key={list.id} id={list.id} title={list.title}/>)}
                </div>
                : <div>
                    Списков нет
                </div>
            }
            <div>
                Создать список
                <input type='text' value={inputValue} onChange={handleInput}/>
                <button onClick={handleAddList}>Добавить</button>
            </div>
            <label>Log out from {userName}</label>
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}
