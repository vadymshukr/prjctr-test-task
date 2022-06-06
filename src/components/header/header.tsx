import {Container} from './header-styled';
import {Button} from '../button';
import {useAuth} from '../../contexts/auth-context';

export const Header = () => {
    const [isLoggedIn, authActions] = useAuth()
    const {login, logout} = authActions
    return (
        <Container>
            {isLoggedIn ?
                <Button type='main' onClick={() => {logout()}}>Logout</Button>
                :
                <Button type='main' onClick={() => {login()}}>Login</Button>
            }
        </Container>
    )
}
