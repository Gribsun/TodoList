// core
import React, {FC, useState, useEffect, ChangeEvent} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import {getAuth, signOut} from 'firebase/auth';
import {Link} from 'react-router-dom';
import {doc, addDoc, updateDoc, deleteDoc, collection} from 'firebase/firestore';

// other
import {database} from '../../firebase';
import {removeUser} from '../../init/slices/userSlice';
import {removeAuth} from '../../init/slices/authSlice';
import {listsCleared, statusHasBeenChanged} from '../../init/slices/todoListsSlice';
import {getTodoLists} from '../../api/todoListsApi';
import {todosCleared} from '../../init/slices/todosSlice';
import {initializationCanceled} from '../../init/slices/appSLice';

// styles
import {Group, Div, Button, Text, Input} from '@vkontakte/vkui';

export const Main: FC = () => {
    const dispatch = useAppDispatch();
    const {id, userName} = useAppSelector(state => state.user);
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const [inputValue, setInputValue] = useState('');
    const [listTitleInput, setListTitleInput] = useState('');

    // Получение списков задач зарегистрированного пользователя из БД
    useEffect(() => {
        getTodoLists(dispatch, id);
    }, [dispatch]);

    // Добавление списка задач в БД
    const handleAddList = async (event: any) => {
        event.preventDefault(event);
        if (!inputValue) return;
        await addDoc(collection(database, `users/${id}/todolists`), {
            title: inputValue,
        });
        setInputValue('');
    }

    // Редактирование списка задач
    const handleChangeList = async (listId: string) => {
        await updateDoc(doc(database, `users/${id}/todolists`, listId), {
            title: listTitleInput,
        })
        setListTitleInput('');
    }

    // Удаление списка задач из БД
    const handleDeleteList = async (listId: string) => {
        await deleteDoc(doc(database, `users/${id}/todolists`, listId));
    }

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const handleListTitleInput = (event: ChangeEvent<HTMLInputElement>) => {
        setListTitleInput(event.target.value);
    }

    const handleListChangingStatus = (listId: string) => {
        dispatch(statusHasBeenChanged(listId))
    }

    const lists = useAppSelector(state => state.listsCollection.todoLists);

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            dispatch(removeAuth());
            dispatch(removeUser());
            dispatch(listsCleared());
            dispatch(todosCleared());
            dispatch(initializationCanceled());
        });
    }

    return (
        <Div>
            <form onSubmit={handleAddList}>
                <Input type='text' value={inputValue} onChange={handleInput}/>
                <Button
                    type='submit'
                    disabled={!inputValue}
                >
                    Добавить
                </Button>
            </form>
            {isInitialized
                ? lists
                    ? <Group>
                        <p>Lists</p>
                        {lists.map(list =>
                            <Group key={list.listId}>
                                {list.isEdit
                                    ? <Div>
                                        <Input type='text' value={listTitleInput} onChange={handleListTitleInput}/>
                                        <Button
                                            disabled={!listTitleInput}
                                            onClick={() => handleChangeList(list.listId)}
                                        >
                                            Подтвердить
                                        </Button>
                                        <Button onClick={() => handleListChangingStatus(list.listId)}>Отмена</Button>
                                    </Div>
                                    : <>
                                        <Div>
                                            <Link to={`todolist/${list.listId}`}>
                                                {list.title}
                                            </Link>
                                        </Div>
                                        <Button
                                            onClick={() => handleListChangingStatus(list.listId)}>Редактировать</Button>
                                    </>
                                }
                                <Button onClick={() => handleDeleteList(list.listId)}>Удалить</Button>
                            </Group>
                        )}
                    </Group>
                    :
                    <Div>
                        <Text>
                            Списков нет
                        </Text>
                    </Div>
                : <Text>Загрузка списков задач</Text>}
            <Div>
                <Text>Log out from {userName}</Text>
                <Button onClick={handleLogout}>
                    Logout
                </Button>
            </Div>
        </Div>
    )
}
