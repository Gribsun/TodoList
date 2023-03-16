import {AppDispatch} from '../init';
import {setAuth} from '../init/slices/authSlice';
import {setUser} from '../init/slices/userSlice';

type LocalStorageValueType = {
    displayName: string,
    email: string,
    uid: string,
}

export const getUserInfo = (dispatch: AppDispatch) => {
    const key = localStorage.key(0);
    if (key) {
        dispatch(setAuth());
        const value: LocalStorageValueType = JSON.parse('' + localStorage.getItem(key));
        const {displayName, email, uid} = value;
        dispatch(setUser({
            displayName,
            email,
            uid,
        }));
    }
}
