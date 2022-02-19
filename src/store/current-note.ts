import { NotesType } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';

export const initialState: NotesType = {
    id: null,
    content: '',
    title: ''
} as NotesType

const slice = createSlice({
    name: 'current-note',
    initialState: initialState,
    reducers: {
        setCurrentNote(state, action) {
            return action.payload
        }
    }
})

export const currentNoteReducer = slice.reducer
export const actions = slice.actions
export const { setCurrentNote } = slice.actions

export function getCurrentNoteSelector(state: AppState) {
    return state.currentNote
}
