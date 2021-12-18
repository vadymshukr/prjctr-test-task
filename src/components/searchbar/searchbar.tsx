import React, { useState } from 'react';
import { Button } from '../button';
import { Container, Input, SearchTitle } from './searchbar-styled';

interface Props {
    handleSearch: (value: string) => void
}

export function Searchbar ({ handleSearch }: Props) {
    const [inputValue, setInputValue] = useState('')
    return (
        <Container>
            <SearchTitle>Search:</SearchTitle>
            <Input onBlur={(e) => {setInputValue(e.target.value)}} />
            <Button type='main' onClick={() => {handleSearch(inputValue)}}>Search</Button>
        </Container>
    )
}