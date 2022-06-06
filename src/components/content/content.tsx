import React, { PropsWithChildren } from 'react';
import { Container } from './content-styled';
import {Header} from '../header';


export function Content ({children}: PropsWithChildren<any>) {
    return (
        <Container>
            <Header />
            {children}
        </Container>
    )
}
