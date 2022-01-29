import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sanitizeConf } from '../../helpers/sanitizeHtmlOptions';
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
    handleModalClose: (value: boolean) => void,
    maxTitleLength?: number
    editableNote?: notesType
    maxContentLength?: number
}

export function CreateNote({handleModalClose, maxTitleLength = 20, editableNote, maxContentLength = 1000} : Props) {
    const [titleValue, setTitleValue] = useState('')
    const [contentValue, setContentValue] = useState('')
    const contentEditableRef = useRef<HTMLDivElement>(null);
    const sanitizedTitleLength = useMemo(() => sanitizeHtml(titleValue, {allowedTags: []}).length, [titleValue])
    const sanitizedContentLength = useMemo(() => sanitizeHtml(contentValue, {allowedTags: []}).length, [contentValue])
    const dispatch = useDispatch()
    const isSaveButtonDisabled = useMemo(() => {
        return !contentValue.length || !titleValue.length || sanitizedTitleLength > maxTitleLength || sanitizedContentLength > maxContentLength
    }, [contentValue, titleValue])

    const titleCounter = useMemo(() => {
        return maxTitleLength - sanitizedTitleLength
    }, [titleValue])

    const contentCounter = useMemo(() => {
        return maxContentLength - sanitizedContentLength
    }, [contentValue])

    useEffect(() => {
        if (editableNote){
            setTitleValue(editableNote.title)
            setContentValue(editableNote.content)
        }
    }, [])

    const handleTitleLength = (e: ContentEditableEvent) => {
        const value = (e.target as HTMLInputElement).value
        if (value.length <= maxTitleLength ) {
            setTitleValue(sanitizeHtml(value, sanitizeConf))
        } else {
            const part1 = sanitizeHtml(value, sanitizeConf).slice(0, maxTitleLength)
            const part2 = sanitizeHtml(value, sanitizeConf).slice(maxTitleLength)
            setTitleValue(part1 + '<small>' + part2 +'</small>')
        }
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

    const makeBold = (e: MouseEvent) => {
        e.preventDefault();
        document.execCommand('bold', false);
    }

    const makeItalic = (e: MouseEvent) => {
        e.preventDefault();
        document.execCommand('italic', false);
    }

    const makeHeading = (e: MouseEvent) => {
        e.preventDefault();
        document.execCommand('formatBlock', false, 'h1');
    }

    return (
        <Container>
            <Title>Create new note</Title>
            <FormGroup>
                <Label>Title ({titleCounter})</Label>
                <ContentEditableStyled
                    html={titleValue}
                    onChange={(e) => {handleTitleLength(e)}}
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
                <Button type='main' onClick={(e:MouseEvent) => {makeBold(e)}}>Bold</Button>
                <Button type='main' onClick={(e:MouseEvent) => {makeItalic(e)}}>Italic</Button>
                <Button type='main' onClick={(e:MouseEvent) => {makeHeading(e)}}>Make h1</Button>
            </ButtonGroupControl>
            <ButtonGroup>
                {editableNote
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