import { createSlice } from '@reduxjs/toolkit';
import { NotesService } from '../components/services/notesService';
import { AppState } from './store';
import {NotesType} from '../types';



export const initialState: NotesType[] = []

const slice = createSlice({
    name: 'notes',
    initialState: initialState,
    reducers: {
        setInitialNotes(state, action) {
            return action.payload
        },
        addNewNote(state, action) {
            const newState = [...state, action.payload]
            NotesService.addNewNote(newState);
            return newState;
        },
        editNote(state, action) {
            const updatedIndex = state.findIndex((note: NotesType) => {
                return note.id === action.payload.id;
            })

            const newState = [
                ...state.slice(0, updatedIndex),
                { ...state[updatedIndex],
                    content: action.payload.content,
                    title:action.payload.title },
                ...state.slice(updatedIndex + 1),
            ]

            NotesService.editNote(newState)

            return newState

        },
        deleteNote(state, action){
            const deletedIndex = state.findIndex((note: NotesType) => {
                return note.id === action.payload;
            })
            const newState = [
                ...state.slice(0, deletedIndex),
                ...state.slice(deletedIndex + 1),
            ]

            NotesService.deleteNote(newState)
            return newState
        }
    }
})


export const notesReducer = slice.reducer
export const { setInitialNotes, addNewNote, editNote, deleteNote } = slice.actions
export const actions = slice.actions

export function getNotesList(state: AppState) {
    return state.notes
}
