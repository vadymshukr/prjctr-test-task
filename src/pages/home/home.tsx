import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, CreateNote, Note, Searchbar } from '../../components';
import { getNotesList, notesType } from '../../store/notes';
import { Container, NotesList, TopNavigation } from './home-styled';
import Modal from 'react-modal';
Modal.setAppElement('#root');

export function Home () {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [visibleNotes, setVisibleNotes] = useState([] as notesType[]);
    const notes = useSelector(getNotesList)

    useEffect(() => {
        setVisibleNotes(notes)
    }, [notes])

    const handleSearch = (value: string) => {
        const filteredNotes = notes.filter(note => note.title.includes(value) || note.content.includes(value))
        setVisibleNotes(filteredNotes)
    }
    return (
        <>
            <Container>
                <TopNavigation>
                    <Searchbar handleSearch={handleSearch}/>
                    <Button onClick={() => {setModalIsOpen(true)}}>
                        Create note
                    </Button>
                </TopNavigation>
                {visibleNotes.length > 0 ?
                <NotesList>
                    {visibleNotes.map( item => (
                        <Note content={item.content} id={item.id} title={item.title} key={item.id}/>
                    ))}
                </NotesList>
                    :
                    <h1>Sorry, you don't have any notes or notes not includes your search query</h1>
                }

            </Container>
            <Modal
                isOpen={modalIsOpen}
                style={{content: {
                    background: 'transparent',
                    borderColor: 'transparent'
                }}}>
                <CreateNote
                    handleModalClose={(value: boolean) => setModalIsOpen(value)}
                />
            </Modal>
        </>
    )
}