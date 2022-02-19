import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
import {
    addNewNote,
    deleteNote,
    editNote,
    getNotesList,
    initialState,
    setInitialNotes
} from '../store/notes';
import {
    getCurrentNoteSelector,
    initialState as currentNoteInitial,
    setCurrentNote,
} from '../store/current-note'
import { useDispatch, useSelector,  Provider as ReduxProvider } from 'react-redux';
import { Dispatch } from 'redux';
import { store } from '../store';
import { NotesType } from '../types';
import {getVisibleNotes, setVisibleNotes} from '../store/visible-notes';

const NotesListContext = createContext<[NotesType[], Dispatch]>([initialState, useDispatch])
const SingleNoteContext = createContext<[NotesType, Dispatch]>([currentNoteInitial, useDispatch])
const VisibleNotesContext = createContext<[NotesType[], Dispatch]>([[] as NotesType[], useDispatch])

function NotesListProvider({ children }: PropsWithChildren<any>) {
    const  dispatch = useDispatch()
    const state = useSelector(getNotesList);
    return (
        <NotesListContext.Provider value={[state, dispatch]}>{children}</NotesListContext.Provider>
    )
}

function CurrentNoteProvider({children}: PropsWithChildren<any>) {
    const dispatch = useDispatch()
    const state = useSelector(getCurrentNoteSelector)
    return (
        <SingleNoteContext.Provider value={[state, dispatch]}>{children}</SingleNoteContext.Provider>
    )
}

function VisibleNotesProvider({children}: PropsWithChildren<any>) {
    const dispatch = useDispatch()
    const state = useSelector(getVisibleNotes)
    return (
        <VisibleNotesContext.Provider value={[state, dispatch]}>{children}</VisibleNotesContext.Provider>
    )
}

export function ReduxWrapper({children} : PropsWithChildren<any>){
    return (
        <ReduxProvider store={store}>
            <CurrentNoteProvider>
                <NotesListProvider>
                    <VisibleNotesProvider>{children}</VisibleNotesProvider>
                </NotesListProvider>
            </CurrentNoteProvider>
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
    return [state, actions] as const
}

export function useSingleNoteState() {
    const [state, dispatch] = useContext(SingleNoteContext)
    const [actions] = useState(() => ({
        setCurrentNote: (payload: NotesType) => dispatch(setCurrentNote(payload)),
    }))
    return [state, actions] as const
}

export function useVisibleNotesState() {
    const [state, dispatch] = useContext(VisibleNotesContext)
    const [actions] = useState(() => ({
        setVisibleNotes: (payload: NotesType[]) => dispatch(setVisibleNotes(payload))
    }))
    return [state, actions] as const
}
