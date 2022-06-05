import {createContext, PropsWithChildren, ReactNode, useContext, useState} from 'react';
import {getAuthState, initialState, login, logout} from '../store/auth';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import {Auth} from '../components/auth';

export const AuthContext = createContext<[boolean, Dispatch]>([initialState.isLoggedIn, useDispatch])

export function AuthProvider({children} : PropsWithChildren<ReactNode>) {
    const dispatch = useDispatch()
    const authState = useSelector(getAuthState)
    dispatch(login)
    return (
        <AuthContext.Provider value={[authState, dispatch]} >
            {authState ? children : <Auth />}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const [state, dispatch] = useContext(AuthContext)
    const [actions] = useState(() => ({
        login: () => dispatch(login(state)),
        logout: () => dispatch(logout(state))
    }))

    return [state, actions] as const
}
