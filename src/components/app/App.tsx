import React from 'react'
import { Content, Routers } from '../index'
import {ReduxWrapper} from '../../contexts';
import {Auth} from '../auth';
import {AuthProvider} from '../../contexts/auth-context';

export function App() {
    return (
        <ReduxWrapper>
            <AuthProvider>
                <Content>
                    <Routers />
                </Content>
            </AuthProvider>
        </ReduxWrapper>
    )
}
