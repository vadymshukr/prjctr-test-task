import React, { PropsWithChildren } from 'react';
import { Container } from './content-styled';


export function Content ({children}: PropsWithChildren<any>) {
    return (
        <Container>
            {children}
        </Container>
    )
}
