import {createContext, FC, PropsWithChildren, ReactNode} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { RouterContextType } from '../types';

export const RouterContext = createContext<RouterContextType>({
    navigate: () => {},
    getId: () => ''
})

export const RouterProvider: FC<ReactNode > = ({children}: PropsWithChildren<ReactNode>) => {
    const navigate = useNavigate()
    const navigateTo = (route: string) => {navigate(route)}
    return (
        <RouterContext.Provider value={{navigate: navigateTo, getId: () => useParams().id}}>
            {children}
        </RouterContext.Provider>
    )
}
