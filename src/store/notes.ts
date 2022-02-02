import { createSlice } from '@reduxjs/toolkit';
import { NotesService } from '../components/services/notesService';
import { AppState } from './store';

export interface notesType {
    title: string;
    content: string;
    id: number;
}

const initialState: notesType[] = []

const slice = createSlice({
    name: 'notes',
    initialState: initialState,
    reducers: {
        getInitialNotes(state) {
            const data = NotesService.getAllNotes()
            if (data){
                return JSON.parse(data)
            } else {
                return initialState
            }
        },
        addNewNote(state, action) {
            const newState = [...state, action.payload]
            NotesService.addNewNote(newState);
            return newState;
        },
        editNote(state, action) {
            const updatedIndex = state.findIndex((note: notesType) => {
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
            const deletedIndex = state.findIndex((note: notesType) => {
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
export const { getInitialNotes, addNewNote, editNote, deleteNote } = slice.actions

export function getNotesList(state: AppState) {
    return state.notes
}