// core
import React, {FC} from 'react';
import {Link} from "react-router-dom";

// other

// types
interface IProps {
    id: number,
    title: string,
}

export const TodoList: FC<IProps> = (props) => {
    return <Link to={`/list/${props.id}`}>{props.title}</Link>
}
