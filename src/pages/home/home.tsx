import React, { useEffect } from 'react';
import { Button, Note, Searchbar } from '../../components';
import { Container, NotesList, TopNavigation } from './home-styled';
import { NotesType } from '../../types';
import { NotesService } from '../../components/services/notesService';
import {useNoteListState, useSingleNoteState, useVisibleNotesState} from '../../contexts';
import { initialState } from '../../store/current-note';
import {changeRoute} from '../../helpers/funcs';

export function Home () {
    const [notesState, notesActions] = useNoteListState()
    const [_, singleNoteActions] = useSingleNoteState()
    const [visibleNotesState, visibleNotesActions] = useVisibleNotesState()
    const notes = notesState

    useEffect(() => {
        const data = NotesService.getAllNotes()
        if (data) {
            notesActions.setInitialNotes(JSON.parse(data))
        }
    }, [])

    useEffect(() => {
        visibleNotesActions.setVisibleNotes(notes)
    }, [notes])

    const handleSearch = (value: string) => {
        const filteredNotes = notes.filter(note => note.title.includes(value) || note.content.includes(value))
        visibleNotesActions.setVisibleNotes(filteredNotes)
    }

    const handleNoteEdit =({id, content, title}: NotesType) => {
        singleNoteActions.setCurrentNote({id, content, title})
        changeRoute('edit')
    }

    const handleNoteDelete = (id: number | null) => {
        notesActions.deleteNote(id)
    }

    const handleNoteNavigate = (id: number | null) => {
        changeRoute(id ? id.toString(): '#')
    }

    const handleCreateNote = () => {
        singleNoteActions.setCurrentNote(initialState)
        changeRoute('create')
    }

    return (
        <Container>
            <TopNavigation>
                <Searchbar handleSearch={handleSearch}/>
                <Button onClick={handleCreateNote}>
                    Create note
                </Button>
            </TopNavigation>
            {visibleNotesState.length > 0 ?
            <NotesList>
                {visibleNotesState.map( item => {
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
    )
}
