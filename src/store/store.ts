import { configureStore } from '@reduxjs/toolkit';
import { notesReducer } from './notes';

export const store = configureStore({
    reducer: {
        notes: notesReducer,
    },
    preloadedState: {}
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch