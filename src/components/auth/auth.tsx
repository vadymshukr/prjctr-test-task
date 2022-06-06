import React, {useState} from 'react';
import {Box, Container, Title, Error} from './auth-styled';
import {Button} from '../button';
import {User} from '../../types';
import {AuthService} from '../services/authService';
import {useAuth} from '../../contexts/auth-context';

type Props = {
    handleSubmit: (user: User) => void
    error: boolean
}

export const Auth: React.FC = () => {
    const [_, {login}] = useAuth()
    const [error, setError] = useState(false)
    const handleSubmit = (user: User) => {
        if (AuthService.checkUser(user)) {
            setError(false)
            login()
        } else {
           setError(true)
        }
    }
    return (
        <AuthView handleSubmit={handleSubmit} error={error}/>
    )
}

export const AuthView: React.FC<Props> = ({handleSubmit, error}) => {
    const [creds, setCreds] = useState<User>({login: '', password: ''})

    return (
        <Container>
            <Box>
                <Title>Please, log in!</Title>
                <input type="text" placeholder='Login' onChange={(e) => {setCreds({...creds, login: e.target.value})}}/>
                <input type="password" placeholder='Password' onChange={(e) => {setCreds({...creds, password: e.target.value})}}/>
                <Button type='main' onClick={() => { handleSubmit(creds) }}>Submit</Button>
                {error &&
                    <Error>Wrong Data</Error>
                }
            </Box>
        </Container>
    )
}
