// core
import React, {FC, useState, useEffect, FormEvent} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux-hooks';
import {collection, addDoc} from 'firebase/firestore';

// components
import {Todo} from './Todo/Todo';

// other
import {database} from '../../../firebase';
import {getTodos} from '../../../api/todosApi';
import {todosCleared} from '../../../init/slices/todosSlice';

// styles
import {Button, Div, Group, Input, Text} from '@vkontakte/vkui';

export const TodoList: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    const [inputValue, setInputValue] = useState('');
    const userId = useAppSelector(state => state.user.id);
    const {id} = useParams()!;

    // Получение задач из списка
    useEffect(() => {
        getTodos(dispatch, userId, id);
    }, [dispatch, userId]);

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    // Добавление задачи в список
    const handleAddTodo = async (event: FormEvent) => {
        event.preventDefault();
        if (!inputValue) return;
        await addDoc(collection(database, `users/${userId}/todolists/${id}/todos`), {
            text: inputValue,
            status: false,
        });
        setInputValue('');
    }

    const handleGoToMainPage = () => {
        navigate('/');
        dispatch(todosCleared());
    }

    const todos = useAppSelector(state => state.todosCollection.todos);

    return (
        <Div>
            <Text>
                Новая задача
            </Text>
            <form onSubmit={handleAddTodo}>
                <Input type='text' value={inputValue} onChange={handleInput}/>
                <Button
                    type='submit'
                    disabled={!inputValue}
                >
                    Добавить
                </Button>
            </form>
            {isInitialized
                ? todos.length
                    ? <Group>
                        {todos.map(todo =>
                            <Group key={todo.todoId}>
                                <Todo
                                    key={todo.todoId}
                                    todoId={todo.todoId}
                                    text={todo.text}
                                    status={todo.status}
                                    isEdit={todo.isEdit}
                                />
                            </Group>
                        )}
                    </Group>
                    : <Div>
                        Задач нет
                    </Div>
                : <Text>Загрузка задач</Text>
            }
            <Button onClick={handleGoToMainPage}>
                На главную
            </Button>
        </Div>
    )
}
