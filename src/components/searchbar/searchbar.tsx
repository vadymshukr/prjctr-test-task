import React from 'react'
import { Button } from '../button';
import { Container, Input, SearchTitle } from './searchbar-styled';

export function Searchbar () {
    return (
        <Container>
            <SearchTitle>Search:</SearchTitle>
            <Input />
            <Button type='main'>Search</Button>
        </Container>
    )
}