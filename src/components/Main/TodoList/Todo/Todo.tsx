// core
import React, {ChangeEvent, FC, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../../hooks/redux-hooks';
import {doc, updateDoc, deleteDoc} from 'firebase/firestore';

// other
import {database} from '../../../../firebase';
import {statusTodoHasBeenChanged} from '../../../../init/slices/todosSlice';

// styles
import style from './Todo.module.css';
import {Button, Div, Input, Text} from '@vkontakte/vkui';


// types
type TodoPropsType = {
    todoId: string,
    text: string,
    status: boolean,
    isEdit: boolean,

}

export const Todo: FC<TodoPropsType> = ({todoId, text, status, isEdit}) => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector(state => state.user.id);
    const {id} = useParams()!;
    const [changeTodoTextInput, setChangeTodoTextInput] = useState('');

    // Изменение статуса задачи
    const handleChangeTodoStatus = async (todoId: string) => {
        await updateDoc(doc(database, `users/${userId}/todolists/${id}/todos`, todoId), {
            status: !status,
        })
    }

    // Редактирование задачи
    const handleChangeTodo = async (todoId: string) => {
        await updateDoc(doc(database, `users/${userId}/todolists/${id}/todos`, todoId), {
            text: changeTodoTextInput,
        })
        setChangeTodoTextInput('');
    }

    const handleTodoTextInput = (event: ChangeEvent<HTMLInputElement>) => {
        setChangeTodoTextInput(event.target.value);
    }

    const handleTodoChangingStatus = (todoId: string) => {
        dispatch(statusTodoHasBeenChanged(todoId))
    }

    // Удаление задачи из списка
    const handleDeleteTodo = async (todoId: string) => {
        await deleteDoc(doc(database, `users/${userId}/todolists/${id}/todos`, todoId));
    }

    return (
        <Div className={status ? style.todoDone : style.todoIsNotCompleted}>
            {isEdit
                ? <Div>
                    <Input type='text' value={changeTodoTextInput} onChange={handleTodoTextInput}/>
                    <Button
                        disabled={!changeTodoTextInput}
                        onClick={() => handleChangeTodo(todoId)}
                    >
                        Подтвердить
                    </Button>
                    <Button onClick={() => handleTodoChangingStatus(todoId)}>Отмена</Button>
                </Div>
                : <Div>
                    <Text>{text}</Text>
                    <Button onClick={() => handleChangeTodoStatus(todoId)}>
                        {
                            status
                                ? 'Перевести в не выполнено'
                                : 'Перевести в выполнено'
                        }
                    </Button>
                    <Button onClick={() => handleTodoChangingStatus(todoId)}>Редактировать</Button>
                </Div>
            }
            <Button onClick={() => handleDeleteTodo(todoId)}>Удалить</Button>
        </Div>
    )
}
