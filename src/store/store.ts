import { configureStore } from '@reduxjs/toolkit';
import { notesReducer } from './notes';
import { currentNoteReducer } from './current-note';
import { visibleNotesReducer } from './visible-notes';
import {authReducer} from './auth';

export const store = configureStore({
    reducer: {
        notes: notesReducer,
        visibleNotes: visibleNotesReducer,
        currentNote: currentNoteReducer,
        auth: authReducer
    },
    preloadedState: {}
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
