import React, { PropsWithChildren } from 'react';
import { Container } from './content-styled';

interface Props {

}

export function Content ({children}: PropsWithChildren<Props>) {
    return (
        <Container>
            {children}
        </Container>
    )
}