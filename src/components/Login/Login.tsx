// core
import React, {FC} from 'react';
import {getAuth, GoogleAuthProvider, signInWithPopup, setPersistence} from 'firebase/auth';
import {browserLocalPersistence} from '@firebase/auth';
import {useAppDispatch} from '../../hooks/redux-hooks';

// other
import {getUserInfo} from '../../helpers/get-user-info';
import {setAuth} from '../../init/slices/authSlice';

// styles
import {Div, Headline, Button} from '@vkontakte/vkui';

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
                .catch(console.error));
    }

    return (
        <Div>
            <Headline>
                Sign in with your google account
            </Headline>
            <Button onClick={handleLogin}>
                Login
            </Button>
        </Div>
    )
}
