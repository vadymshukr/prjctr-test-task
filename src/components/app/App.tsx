import React from 'react'
import { Content, Routers } from '../index'
import {ReduxWrapper} from '../../contexts';

export function App() {
    return (
        <ReduxWrapper>
            <Content>
                <Routers />
            </Content>
        </ReduxWrapper>

    )
}
