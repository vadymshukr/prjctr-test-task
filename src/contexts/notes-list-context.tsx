import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
import {
    addNewNote,
    deleteNote,
    editNote,
    getNotesList,
    initialState,
    setInitialNotes
} from '../store/notes';
import { useDispatch, useSelector,  Provider as ReduxProvider } from 'react-redux';
import { Dispatch } from 'redux';
import { store } from '../store';
import { NotesType } from '../types';
import {getModalStatus, setModalHidden, setModalVisible} from '../store/modalStatus';

const NotesListContext = createContext<[NotesType[], Dispatch]>([initialState, useDispatch])
const ModalStatusContext = createContext<[boolean, Dispatch]>([false, useDispatch])

function NotesListProvider({ children }: PropsWithChildren<any>) {
    const  dispatch = useDispatch()
    const state = useSelector(getNotesList);
    return (
        <NotesListContext.Provider value={[state, dispatch]}>{children}</NotesListContext.Provider>
    )
}

function ModalProvider({children}: PropsWithChildren<any> ) {
    const dispatch = useDispatch()
    const state = useSelector(getModalStatus)
    return (
        <ModalStatusContext.Provider value={[state, dispatch]}>{children}</ModalStatusContext.Provider>
    )
}

export function ReduxWrapper({children} : PropsWithChildren<any>){
    return (
        <ReduxProvider store={store}>
            <NotesListProvider>
                <ModalProvider>
                    {children}
                </ModalProvider>
            </NotesListProvider>
        </ReduxProvider>
        )
}

export function useNoteListState() {
    const [state, dispatch] = useContext(NotesListContext)
    const [actions] = useState(() => ({
        setInitialNotes: (payload: any) => dispatch(setInitialNotes(payload)),
        addNewNote: (payload: any) => dispatch(addNewNote(payload)),
        editNote: (payload: any) => dispatch(editNote(payload)),
        deleteNote:(payload: any) => dispatch(deleteNote(payload))
    }))

    return [state, actions] as const;
}

export function useModalStatus() {
    const [state, dispatch] = useContext(ModalStatusContext)
    const [actions] = useState(() => ({
        setModalVisible: () => dispatch(setModalVisible()),
        setModalHidden: () => dispatch(setModalHidden()),
    }))

    return [state, actions] as const;
}
