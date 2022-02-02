import React, { useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MAX_CONTENT_LENGTH, MAX_TITLE_LENGTH } from '../../helpers/constants';
import { HtmlFormattingEnum } from '../../helpers/enums';
import { makeStringWithError } from '../../helpers/funcs';
import { sanitizeConf, sanitizeNoTagsConf } from '../../helpers/sanitizeHtmlOptions';
import { addNewNote, editNote, notesType } from '../../store/notes';
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
import { ContentEditableEvent } from 'react-contenteditable';
import sanitizeHtml from "sanitize-html";

type Props = {
    handleModalClose: (value: boolean) => void
    maxTitleLength?: number
    editableNote?: notesType
    maxContentLength?: number
}

type CreateNoteViewProps = {
    titleValue: string
    contentValue: string
    titleCounter: number
    contentCounter: number
    handleTitleChange: (e: ContentEditableEvent) => void
    handleContentChange: (e: ContentEditableEvent) => void
    isSaveButtonDisabled: boolean
    isNoteEditable?: notesType
    handleEdit: () => void
    handleSave: () => void
    handleModalClose: (arg: boolean) => void
    makeHtmlFormatting: (e: MouseEvent, type: HtmlFormattingEnum) => void
}

const CreateNoteView = ({
                            titleValue,
                            contentValue,
                            handleTitleChange,
                            handleContentChange,
                            titleCounter,
                            contentCounter,
                            isSaveButtonDisabled,
                            isNoteEditable,
                            handleEdit,
                            handleSave,
                            handleModalClose,
                            makeHtmlFormatting,
                            }: CreateNoteViewProps) => {
    const contentEditableRef = useRef<HTMLDivElement>(null);

    return (
        <Container>
            <Title>Create new note</Title>
            <FormGroup>
                <Label>Title ({titleCounter})</Label>
                <ContentEditableStyled
                    html={titleValue}
                    onChange={handleTitleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label>Content ({contentCounter})</Label>
                <Textarea
                    onChange={handleContentChange}
                    html={contentValue}
                    innerRef={contentEditableRef}
                />
            </FormGroup>
            <ButtonGroupControl>
                <Button type='main' onClick={e => makeHtmlFormatting(e, HtmlFormattingEnum.Bold)}>Bold</Button>
                <Button type='main' onClick={e => makeHtmlFormatting(e, HtmlFormattingEnum.Italic)}>Italic</Button>
                <Button type='main' onClick={e => makeHtmlFormatting(e, HtmlFormattingEnum.Heading)}>Make h1</Button>
            </ButtonGroupControl>
            <ButtonGroup>
                {isNoteEditable
                    ?
                    <Button type='main' disabled={isSaveButtonDisabled} onClick={handleEdit}>Edit</Button>
                    :
                    <Button type='main' disabled={isSaveButtonDisabled} onClick={handleSave}>Save</Button>
                }
                <Button type='warning' onClick={() => {handleModalClose(false)}}>Cancel</Button>
            </ButtonGroup>
        </Container>
    )
}

export function CreateNote({handleModalClose, editableNote} : Props) {
    const dispatch = useDispatch()
    const [titleValue, setTitleValue] = useState(editableNote?.title ? editableNote?.title : '')
    const [contentValue, setContentValue] = useState(editableNote?.content ? editableNote?.content : '')

    const sanitizedTitleLength = useMemo(() => sanitizeHtml(titleValue, sanitizeNoTagsConf).length, [titleValue])

    const sanitizedContentLength = useMemo(() => sanitizeHtml(contentValue, sanitizeNoTagsConf).length, [contentValue])

    const isSaveButtonDisabled = useMemo(() => {
        return !contentValue.length || !titleValue.length || sanitizedTitleLength > MAX_TITLE_LENGTH || sanitizedContentLength > MAX_CONTENT_LENGTH
    }, [contentValue, titleValue])


    const handleTitleLength = (e: ContentEditableEvent) => {
        const { value } = (e.target as HTMLInputElement)
        const sanitizedValue = sanitizeHtml(value, sanitizeConf)
        setTitleValue(makeStringWithError(sanitizedValue, MAX_TITLE_LENGTH))
    }

    const handleContentChange = (e:ContentEditableEvent) => {
        const value = (e.target as HTMLInputElement).value
        if ((e.nativeEvent as InputEvent).inputType === 'insertFromPaste'){
            navigator.clipboard.readText()
                .then(text => {
                    setContentValue(contentValue + sanitizeHtml(text, sanitizeConf) + '&nbsp;')
                })
                .catch(err => {
                    console.error('Failed to read clipboard contents: ', err);
                });
        } else {
            setContentValue(value)
        }
    }

    const handleSave = () => {
        dispatch(addNewNote({
            id: new Date().getTime(),
            title: titleValue,
            content: contentValue}))
        handleModalClose(false)
    }

    const handleEdit = () => {
        dispatch(editNote({
            id: editableNote?.id,
            title: titleValue,
            content: contentValue}))
        handleModalClose(false)
    }

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
       <CreateNoteView
            titleValue={titleValue}
            contentValue={contentValue}
            isSaveButtonDisabled={isSaveButtonDisabled}
            isNoteEditable={editableNote}
            makeHtmlFormatting={(e, type) => makeHtmlFormatting(e, type)}
            handleModalClose={handleModalClose}
            handleSave={handleSave}
            handleEdit={handleEdit}
            titleCounter={MAX_TITLE_LENGTH - sanitizedTitleLength}
            contentCounter={MAX_CONTENT_LENGTH - sanitizedContentLength}
            handleTitleChange={handleTitleLength}
            handleContentChange={handleContentChange}
       />
    )
}