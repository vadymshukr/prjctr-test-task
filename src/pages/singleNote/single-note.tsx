import React, {useContext, useEffect} from 'react';
import { Button } from '../../components';
import {Content, Main } from '../../components/note/note-styled';
import sanitizeHtml from "sanitize-html";
import { NotesService } from '../../components/services/notesService';
import { sanitizeConf } from '../../helpers/sanitizeHtmlOptions';
import { ButtonWrapper, Container } from './single-note-styled';
import {RouterContext} from '../../contexts/router-context';
const linkEventListener = (e: MouseEvent, link: HTMLAnchorElement) =>
{
    e.preventDefault();
    const conf = window.confirm('You want to leave this page?');
    if(conf){
        window.open(link.href, '_blank');
    }
}

export function SingleNote() {
  const { getId } = useContext(RouterContext);
  const id = getId()
  const single = NotesService.getSingleNote(Number(id))
  const { navigate } = useContext(RouterContext)

  useEffect(() => {
      const links:NodeListOf<HTMLAnchorElement> = (document.querySelectorAll('a'));
      links.forEach((link) => {
          link.addEventListener('click', (e) => {
              linkEventListener(e, link);
          })
      })

      return () => {
          links.forEach((link) => {
              link.removeEventListener( 'click', (e) => {
                  linkEventListener( e, link );
              } )
          })
      }

  }, [])

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
