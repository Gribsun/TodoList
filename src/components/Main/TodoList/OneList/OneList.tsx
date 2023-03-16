// core
import React, {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux-hooks";

// other

// types

export const OneList: FC = () => {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useAppDispatch();

    useEffect(() => {

    }, [dispatch])
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const handleAddTask = () => {

    }
    const {id} = useParams();
    const {lists} = useAppSelector(store => store.listsCollection);

    const list = lists.find(list => id ? list.id === +id : null);

    return <>
        <input type='text' value={inputValue} onChange={handleInput}/>
        <button onClick={handleAddTask}>Добавить</button>
        <div>В очереди</div>
        <div>Задач нет</div>
        <div>В работе</div>
        <div>Задач нет</div>
        <div>Выполнено</div>
        <div>Задач нет</div>
    </>
}
