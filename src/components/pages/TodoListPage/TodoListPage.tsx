// core
import React, {FC, useEffect} from 'react';
import {useAppDispatch} from '../../../hooks/redux-hooks';

// components
import {TodoList} from "../../Main/TodoList/TodoList";

// other
import {getUserInfo} from '../../../helpers/get-user-info';

export const TodoListPage: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        getUserInfo(dispatch);
    }, [dispatch]);

    return (
        <TodoList/>
    )
}
