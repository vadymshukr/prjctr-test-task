import React, { useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import sanitizeHtml from 'sanitize-html';
import { MAX_CONTENT_LENGTH, MAX_TITLE_LENGTH } from '../../helpers/constants';
import { FormDataEnum, HtmlFormattingEnum } from '../../helpers/enums';
import { makeStringWithError } from '../../helpers/funcs';
import { sanitizeConf, sanitizeNoTagsConf } from '../../helpers/sanitizeHtmlOptions';
import { setModalHidden } from '../../store/modalStatus';
import { addNewNote, editNote, NotesType } from '../../store/notes';
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

type Props = {
    note?: NotesType
}

type CreateNoteViewProps = {
    formData: NotesType
    handleFormChange: (value: string, type: FormDataEnum) => void
    titleCounter: number
    contentCounter: number
    isSaveButtonDisabled: boolean
    handleSave: (id: number | null) => void
}

const CreateNoteView = ({
                            formData,
                            handleFormChange,
                            titleCounter,
                            contentCounter,
                            isSaveButtonDisabled,
                            handleSave,
                            }: CreateNoteViewProps) => {
    const contentEditableRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
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
                <Button type='warning' onClick={() => {dispatch(setModalHidden())}}>Cancel</Button>
            </ButtonGroup>
        </Container>
    )
}

export function CreateNote({note} : Props) {
    const dispatch = useDispatch()

    const [formData, setFormData] = useState<NotesType>({
        id: note?.id ? note.id : null,
        title: note?.title ? note?.title : '',
        content: note?.content ? note?.content : ''
    })

    const sanitizedTitleLength = useMemo(() => sanitizeHtml(formData.title, sanitizeNoTagsConf).length, [formData.title])

    const sanitizedContentLength = useMemo(() => sanitizeHtml(formData.content, sanitizeNoTagsConf).length, [formData.content])

    const isSaveButtonDisabled = useMemo(() => {
        return !formData.title.length || !formData.content.length || sanitizedTitleLength > MAX_TITLE_LENGTH || sanitizedContentLength > MAX_CONTENT_LENGTH
    }, [formData.title, formData.content])

    const handleFormDataChange = (value: string, type: FormDataEnum) => {
        const sanitizedValue = sanitizeHtml(value, sanitizeConf)
        switch (type) {
            case FormDataEnum.Title:
                setFormData({...formData, title: makeStringWithError(sanitizedValue, MAX_TITLE_LENGTH)})
                break
            case FormDataEnum.Content:
                setFormData({...formData, content: sanitizeHtml(value, sanitizeConf)})
        }
    }

    const handleSave = (id: number | null) => {
        if (id) {
            dispatch(editNote({
                id: id,
                title: formData.title,
                content: formData.content}))
            dispatch(setModalHidden())
        } else {
            dispatch(addNewNote({
                id: new Date().getTime(),
                title: formData.title,
                content: formData.content}))
            dispatch(setModalHidden())
        }

    }
    return (
       <CreateNoteView
            formData={formData}
            isSaveButtonDisabled={isSaveButtonDisabled}
            handleSave={handleSave}
            titleCounter={MAX_TITLE_LENGTH - sanitizedTitleLength}
            contentCounter={MAX_CONTENT_LENGTH - sanitizedContentLength}
            handleFormChange={handleFormDataChange}
       />
    )
}