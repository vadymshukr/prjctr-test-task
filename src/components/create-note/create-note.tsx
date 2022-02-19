import React, { useMemo, useRef, useState } from 'react';
import sanitizeHtml from 'sanitize-html';
import { MAX_CONTENT_LENGTH, MAX_TITLE_LENGTH } from '../../helpers/constants';
import { FormDataEnum, HtmlFormattingEnum } from '../../helpers/enums';
import { makeStringWithError } from '../../helpers/funcs';
import { sanitizeConf, sanitizeNoTagsConf } from '../../helpers/sanitizeHtmlOptions';
import { Button } from '../button';
import {
    ButtonGroup,
    ButtonGroupControl,
    Container,
    ContentEditableStyled,
    FormGroup,
    Label,
    Textarea,
    Title
} from './create-note-styled';
import {NotesType} from '../../types';
import { useNoteListState, useSingleNoteState } from '../../contexts';
import { useNavigate } from 'react-router-dom';

type Props = {
    note: NotesType
}

type CreateNoteViewProps = {
    formData: NotesType
    handleFormChange: (value: string, type: FormDataEnum) => void
    titleCounter: number
    contentCounter: number
    isSaveButtonDisabled: boolean
    handleSave: (id: number | null) => void
    handleCancel: () => void
}

const CreateNoteView = ({
                            formData,
                            handleFormChange,
                            titleCounter,
                            contentCounter,
                            isSaveButtonDisabled,
                            handleSave,
                            handleCancel
                            }: CreateNoteViewProps) => {
    const contentEditableRef = useRef<HTMLDivElement>(null);
    const makeHtmlFormatting = (e: MouseEvent, type: HtmlFormattingEnum) => {
        e.preventDefault();
        switch (type){
            case HtmlFormattingEnum.Bold:
                document.execCommand('bold', false)
                break
            case HtmlFormattingEnum.Italic:
                document.execCommand('italic', false)
                break
            case HtmlFormattingEnum.Heading:
                document.execCommand('formatBlock', false, 'h1');
        }
    }

    return (
        <Container>
            <Title>Create new note</Title>
            <FormGroup>
                <Label>Title ({titleCounter})</Label>
                <ContentEditableStyled
                    html={formData.title}
                    onChange={e => {handleFormChange(e.target.value, FormDataEnum.Title)}}
                />
            </FormGroup>
            <FormGroup>
                <Label>Content ({contentCounter})</Label>
                <Textarea
                    html={formData.content}
                    onChange={e => {handleFormChange(e.target.value, FormDataEnum.Content)}}
                    innerRef={contentEditableRef}
                />
            </FormGroup>
            <ButtonGroupControl>
                <Button type='main' onClick={e => makeHtmlFormatting(e, HtmlFormattingEnum.Bold)}>Bold</Button>
                <Button type='main' onClick={e => makeHtmlFormatting(e, HtmlFormattingEnum.Italic)}>Italic</Button>
                <Button type='main' onClick={e => makeHtmlFormatting(e, HtmlFormattingEnum.Heading)}>Make h1</Button>
            </ButtonGroupControl>
            <ButtonGroup>
                <Button type='main'
                        disabled={isSaveButtonDisabled}
                        onClick={() => {handleSave(formData.id)}}>{formData?.id ? 'Edit' : 'Save'}</Button>
                <Button type='warning' onClick={handleCancel}>Cancel</Button>
            </ButtonGroup>
        </Container>
    )
}

export function CreateNote({note} : Props) {
    const navigate = useNavigate()
    const [_, notesActions] = useNoteListState()
    const [__, singleNoteActions] = useSingleNoteState()

    const sanitizedTitleLength = useMemo(() => sanitizeHtml(note.title, sanitizeNoTagsConf).length, [note.title])
    const sanitizedContentLength = useMemo(() => sanitizeHtml(note.content, sanitizeNoTagsConf).length, [note.content])
    const isSaveButtonDisabled = useMemo(
        () =>
            !note.title.length ||
            !note.content.length ||
            sanitizedTitleLength > MAX_TITLE_LENGTH ||
            sanitizedContentLength > MAX_CONTENT_LENGTH,
        [note.title, note.content]
    )

    const handleFormDataChange = (value: string, type: FormDataEnum) => {
        const sanitizedValue = sanitizeHtml(value, sanitizeConf)
        switch (type) {
            case FormDataEnum.Title:
                singleNoteActions.setCurrentNote({...note, title: makeStringWithError(sanitizedValue, MAX_TITLE_LENGTH)})
                break
            case FormDataEnum.Content:
                singleNoteActions.setCurrentNote({...note, content: sanitizeHtml(value, sanitizeConf)})
        }
    }

    const handleSave = (id: number | null) => {
        if (id) {
            notesActions.editNote({
                id: id,
                title: note.title,
                content: note.content})
        } else {
            notesActions.addNewNote({
                id: new Date().getTime(),
                title: note.title,
                content: note.content})
        }
        navigate('/')
    }
    return (
       <CreateNoteView
            formData={note}
            isSaveButtonDisabled={isSaveButtonDisabled}
            handleSave={handleSave}
            titleCounter={MAX_TITLE_LENGTH - sanitizedTitleLength}
            contentCounter={MAX_CONTENT_LENGTH - sanitizedContentLength}
            handleFormChange={handleFormDataChange}
            handleCancel={() => {navigate('/')}}
       />
    )
}
