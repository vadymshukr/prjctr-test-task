import {User} from '../../types';

const mockupUsers: User[] = [{login: 'user', password: '123'}]

export const AuthService = {
    checkUser: (user: User) => {
        return mockupUsers.filter((item) => item.login === user.login && item.password === user.password).length !== 0
    }
}
