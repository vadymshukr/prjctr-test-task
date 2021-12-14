import React from 'react';
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { Content, Routers } from '../index';

export function App() {
  return (
      <BrowserRouter>
        <Content>
          <Routers />
        </Content>
      </BrowserRouter>
  );
}
