import React, { useEffect, useState } from 'react';
import { Button, CreateNote, Note, Searchbar } from '../../components';
import { Container, NotesList, TopNavigation } from './home-styled';
import Modal from 'react-modal';
import { NotesType } from '../../types';
import { NotesService } from '../../components/services/notesService';
import { useModalStatus, useNoteListState } from '../../contexts';
import {useNavigate} from 'react-router-dom';
Modal.setAppElement('#root');

export function Home () {
    const navigate = useNavigate()
    const [visibleNotes, setVisibleNotes] = useState([] as NotesType[])
    const [currentNote, setCurrentNote] = useState({} as NotesType)
    const [noteState, noteActions] = useNoteListState()
    const [modalState, modalActions] = useModalStatus()
    const notes = noteState

    useEffect(() => {
        const data = NotesService.getAllNotes()
        if (data) {
            noteActions.setInitialNotes(JSON.parse(data))
        }
    }, [])

    useEffect(() => {
        setVisibleNotes(notes)
    }, [notes, noteState])

    const handleSearch = (value: string) => {
        const filteredNotes = notes.filter(note => note.title.includes(value) || note.content.includes(value))
        setVisibleNotes(filteredNotes)
    }

    const handleNoteEdit =({id, content, title}: NotesType) => {
        setCurrentNote({id, content, title})
        modalActions.setModalVisible()
    }

    const handleNoteDelete = (id: number | null) => {
        noteActions.deleteNote(id)
    }

    const handleNoteNavigate = (id: number | null) => {
        navigate(id ? id.toString(): '#')
    }

    const handleCreateNote = () => {
        setCurrentNote({} as NotesType)
        modalActions.setModalVisible()
    }

    return (
        <>
            <Container>
                <TopNavigation>
                    <Searchbar handleSearch={handleSearch}/>
                    <Button onClick={handleCreateNote}>
                        Create note
                    </Button>
                </TopNavigation>
                {visibleNotes.length > 0 ?
                <NotesList>
                    {visibleNotes.map( item => {
                        const {content, id, title} = item;
                        return (
                            <Note
                                note={{content, id, title}}
                                onNoteEdit={handleNoteEdit}
                                onNoteDelete={handleNoteDelete}
                                onNoteNavigate={handleNoteNavigate}
                                key={id}/>
                        )
                    }
                )}

                </NotesList>
                    :
                    <h1>Sorry, you don't have any notes or notes not includes your search query</h1>
                }

            </Container>
            <Modal
                isOpen={modalState}
                style={{content: {
                    background: 'transparent',
                    borderColor: 'transparent'
                }}}>
                <CreateNote note={currentNote}/>
            </Modal>
        </>
    )
}
