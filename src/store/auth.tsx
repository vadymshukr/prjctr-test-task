import {AuthType} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {AppState} from './store';

export const initialState: AuthType = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login(state, action) {
            return {...state, isLoggedIn: true}
        },

        logout(state, action) {
            return {...state, isLoggedIn: false}
        }
    }
})

export const authReducer = slice.reducer
export const { login, logout } = slice.actions

export const getAuthState = (state: AppState) => {
    return state.auth.isLoggedIn
}
