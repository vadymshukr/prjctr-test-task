import {NotesType} from '../../types';

export const NotesService = {
    getAllNotes: () => {
        return localStorage.getItem('notes')
    },
    getSingleNote: (id: number):NotesType => {
        const data = localStorage.getItem('notes')
        return data ? JSON.parse(data).find((note: NotesType) => note.id === id) : null
    },
    addNewNote: (newState: NotesType[]) => {
        localStorage.setItem('notes', JSON.stringify(newState))
    },
    editNote: (newState: NotesType[]) => {
        localStorage.setItem('notes', JSON.stringify(newState))
    },
    deleteNote: (newState: NotesType[]) => {
        localStorage.setItem('notes', JSON.stringify(newState))
    },
}
