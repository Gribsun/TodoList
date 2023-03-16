import React, {FC} from 'react';
import {getAuth, GoogleAuthProvider, signInWithPopup, setPersistence} from "firebase/auth";
import {useAppDispatch} from '../../hooks/redux-hooks';
import {browserLocalPersistence} from '@firebase/auth';
import {getUserInfo} from "../../helpers/get-user-info";
import {setAuth} from "../../init/slices/authSlice";

export const Login: FC = () => {
    const dispatch = useAppDispatch();

    const handleLogin = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        return setPersistence(auth, browserLocalPersistence).then(() =>
            signInWithPopup(auth, provider)
                .then(() => {
                    dispatch(setAuth());
                    getUserInfo(dispatch);
                })
                .catch(console.error))
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (
        <div>
            <h1>
                Sign in with your google account
            </h1>
            <button onClick={handleLogin}>
                Login
            </button>
        </div>
    )
}
