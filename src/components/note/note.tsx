import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sanitizeNoTagsConf } from '../../helpers/sanitizeHtmlOptions';
import { deleteNote, NotesType } from '../../store/notes';
import { Button } from '../button';
import { CreateNote } from '../create-note';
import { ButtonsWrapper, Container, Title, Content, Main } from './note-styled';
import sanitizeHtml from "sanitize-html";

export function Note({content, title, id} : NotesType) {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const dispatch = useDispatch();

    return (
        <>
        <Container>
            <Main>
                <Title to={id ? id.toString(): '#'}>{title}</Title>
                <Content>{sanitizeHtml(content, sanitizeNoTagsConf)}</Content>
            </Main>

            <ButtonsWrapper>
                <Button type='' onClick={() => {navigate(id ? id.toString(): '#')}}>View</Button>
                <Button type='main' onClick={() => {setModalIsOpen(true)}}>Edit</Button>
                <Button type='warning' onClick={() => {dispatch(deleteNote(id))}}>Delete</Button>
            </ButtonsWrapper>
        </Container>
            <Modal
                isOpen={modalIsOpen}
                style={{content: {
                        background: 'transparent',
                        borderColor: 'transparent'
                    }}}>
                <CreateNote
                    note={{content, id, title}}
                />
            </Modal>
        </>
    )
}