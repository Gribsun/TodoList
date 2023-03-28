// core
import React, {FC, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux-hooks';

// components
import {Login} from '../../Login/Login';

// other
import {getUserInfo} from '../../../helpers/get-user-info';

export const LoginPage: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        getUserInfo(dispatch);
    }, [dispatch]);

    const isAuth = useAppSelector(state => state.auth.isAuth);

    return (
        isAuth
            ? <Navigate to={'/'}/>
            : <Login/>
    )
}
