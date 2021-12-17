import React, { PropsWithChildren } from 'react';
import { useDispatch } from 'react-redux';
import { getInitialNotes } from '../../store/notes';
import { Container } from './content-styled';


export function Content ({children}: PropsWithChildren<any>) {
    const dispatch = useDispatch();
    dispatch(getInitialNotes())
    return (
        <Container>
            {children}
        </Container>
    )
}