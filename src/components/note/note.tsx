import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteNote, notesType } from '../../store/notes';
import { Button } from '../button';
import { CreateNote } from '../create-note';
import { ButtonsWrapper, Container, Title, Content, Main } from './note-styled';
import sanitizeHtml from "sanitize-html";


export function Note({content, title, id} : notesType) {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const dispatch = useDispatch();

    const handleDeleteNote = (id: number) => {
        dispatch(deleteNote(id));
    }
    return (
        <>
        <Container>
            <Main>
                <Title to={id.toString()}>{title}</Title>
                <Content>{sanitizeHtml(content, {allowedTags: []})}</Content>
            </Main>

            <ButtonsWrapper>
                <Button type='' onClick={() => {navigate(id.toString())}}>View</Button>
                <Button type='main' onClick={() => {setModalIsOpen(true)}}>Edit</Button>
                <Button type='warning' onClick={() => {handleDeleteNote(id)}}>Delete</Button>
            </ButtonsWrapper>
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
                    editableNote={{content, id, title}}
                />
            </Modal>
        </>
    )
}