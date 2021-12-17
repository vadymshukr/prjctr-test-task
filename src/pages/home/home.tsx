import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, CreateNote, Note, Searchbar } from '../../components';
import { getNotesList } from '../../store/notes';
import { Container, NotesList, TopNavigation } from './home-styled';
import Modal from 'react-modal';
Modal.setAppElement('#root');

export function Home () {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const notes = useSelector(getNotesList)
    return (
        <>
        <Container>
            <TopNavigation>
                <Searchbar />
                <Button onClick={() => {setModalIsOpen(true)}}>
                    Create note
                </Button>
            </TopNavigation>
            <NotesList>
                {notes.map( item => (
                    <Note content={item.content} id={item.id} title={item.title} key={item.id}/>
                ))}
            </NotesList>
        </Container>
            <Modal
                isOpen={modalIsOpen}
                style={{content: {
                    background: 'transparent',
                    borderColor: 'transparent'
                }}}>
                <CreateNote
                    handleModalClose={(value: boolean) => setModalIsOpen(value)}
                    maxTitleLength={10}
                />
            </Modal>
        </>
    )
}