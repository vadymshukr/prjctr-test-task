import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';

const slice = createSlice({
        name: 'modalStatus',
        initialState: false,
        reducers: {
            setModalVisible() {
                return true
            },
            setModalHidden(){
                return false
            }
        }
}

)

export const modalStatusReducer = slice.reducer

export const {setModalVisible, setModalHidden} = slice.actions

export const getModalStatus = function(state: AppState) {
    return state.modalStatus
}