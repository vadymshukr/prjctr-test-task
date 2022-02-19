import {createSlice} from '@reduxjs/toolkit';
import {NotesType} from '../types';
import {AppState} from './store';

const slice = createSlice({
    name: 'visible-notes',
    initialState: [] as NotesType[],
    reducers: {
        setVisibleNotes: (state, action ) => {
            return action.payload
        }
    }
})

export const visibleNotesReducer = slice.reducer
export const actions = slice.actions
export const { setVisibleNotes } = slice.actions

export function getVisibleNotes(state: AppState) {
    return state.visibleNotes
}
