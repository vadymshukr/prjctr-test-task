import React from 'react'
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { store } from '../../store';
import { Content, Routers } from '../index'

export function App() {

    return (
      <ReduxProvider store={store}>
          <BrowserRouter>
            <Content>
              <Routers />
            </Content>
          </BrowserRouter>
      </ReduxProvider>
    )
}
