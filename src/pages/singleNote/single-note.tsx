import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components';
import {Content, Main } from '../../components/note/note-styled';
import sanitizeHtml from "sanitize-html";
import { NotesService } from '../../components/services/notesService';
import { sanitizeConf } from '../../helpers/sanitizeHtmlOptions';
import { ButtonWrapper, Container } from './single-note-styled';

export function SingleNote() {
  const route = useParams();
  const {id} = route;
  const single = NotesService.getSingleNote(Number(id))
  const navigate = useNavigate();
  return (
      <Container>
        <Main>
          <h1>{single.title}</h1>
          <Content dangerouslySetInnerHTML={{__html:sanitizeHtml(single.content, sanitizeConf)}} />
        </Main>
        <ButtonWrapper>
          <Button type='main' onClick={() => {navigate('/')}}>Back</Button>
        </ButtonWrapper>
      </Container>
  )


}