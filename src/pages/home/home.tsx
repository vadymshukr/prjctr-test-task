import React  from 'react'
import { Button, Searchbar } from '../../components';
import { Container, NotesList, TopNavigation } from './home-styled';

export function Home () {
    return (
        <Container>
            <TopNavigation>
                <Searchbar />
                <Button >
                    Create note
                </Button>
            </TopNavigation>
            <NotesList>
                {/*<Note />*/}
            </NotesList>
        </Container>
    )
}