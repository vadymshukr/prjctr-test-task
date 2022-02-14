import React from 'react';
import { sanitizeNoTagsConf } from '../../helpers/sanitizeHtmlOptions';
import { Button } from '../button';
import { ButtonsWrapper, Container, Title, Content, Main } from './note-styled';
import sanitizeHtml from "sanitize-html";
import {NotesType} from '../../types';

type Props = {
    note: NotesType,
    onNoteEdit: ({id, content, title}: NotesType) => void
    onNoteDelete: (id: number | null) => void
    onNoteNavigate: (id: number | null) => void
}

export function Note({note, onNoteEdit, onNoteDelete, onNoteNavigate}: Props) {
    const {id, content, title} = note;

    return (
        <Container>
            <Main>
                <Title to={id ? id.toString(): '#'}>{title}</Title>
                <Content>{sanitizeHtml(content, sanitizeNoTagsConf)}</Content>
            </Main>

            <ButtonsWrapper>
                <Button type='' onClick={() => {onNoteNavigate(id)}}>View</Button>
                <Button type='main' onClick={() => onNoteEdit({id, content, title})}>Edit</Button>
                <Button type='warning' onClick={() => onNoteDelete(id)}>Delete</Button>
            </ButtonsWrapper>
        </Container>
    )
}
