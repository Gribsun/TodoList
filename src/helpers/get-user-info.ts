import {AppDispatch} from '../init';
import {setAuth} from '../init/slices/authSlice';
import {setUser} from '../init/slices/userSlice';

type LocalStorageValueType = {
    displayName: string,
    email: string,
    uid: string,
}

export const getUserInfo = (dispatch: AppDispatch) => {
    const firebaseAuth = 'firebase:authUser';
    let authKey = '';
    for (let key in localStorage) {
        if (key.includes(firebaseAuth)) {
            authKey = key;
            break;
        }
    }
    if (authKey) {
        dispatch(setAuth());
        const value: LocalStorageValueType = JSON.parse('' + localStorage.getItem(authKey));
        const {displayName, email, uid} = value;
        dispatch(setUser({
            displayName,
            email,
            uid,
        }));
    }
}
