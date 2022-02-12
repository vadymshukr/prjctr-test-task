import { configureStore } from '@reduxjs/toolkit';
import { modalStatusReducer } from './modalStatus';
import { notesReducer } from './notes';

export const store = configureStore({
    reducer: {
        notes: notesReducer,
        modalStatus: modalStatusReducer

    },
    preloadedState: {}
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch