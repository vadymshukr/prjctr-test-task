import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Content, Routers } from '../index'
import {ReduxWrapper} from '../../contexts';

export function App() {
    return (
        <ReduxWrapper>
            <BrowserRouter>
                <Content>
                    <Routers />
                </Content>
            </BrowserRouter>
        </ReduxWrapper>

    )
}
