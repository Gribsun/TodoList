import {useEffect, useState} from "react";

export const useAuth = () => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        setIsAuth(!!localStorage.key(0));
    }, []);

    console.log(isAuth);

    return isAuth;
}
