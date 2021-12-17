import { notesType } from '../../store/notes';

export const NotesService = {
    getAllNotes: () => {
        return localStorage.getItem('notes')
    },
    getSingleNote: (id: number):notesType => {
        const data = localStorage.getItem('notes')
        return data ? JSON.parse(data).find((note: notesType) => note.id === id) : null
    },
    addNewNote: (newState: notesType[]) => {
        localStorage.setItem('notes', JSON.stringify(newState))
    },
    editNote: (newState: notesType[]) => {
        localStorage.setItem('notes', JSON.stringify(newState))
    },
    deleteNote: (newState: notesType[]) => {
        localStorage.setItem('notes', JSON.stringify(newState))
    },
}