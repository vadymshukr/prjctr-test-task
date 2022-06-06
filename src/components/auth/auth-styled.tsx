import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`

export const Box = styled.div`
  border-radius: 16px;
  background: #F9F9F9;
  padding: 64px;
  display: flex;
  flex-direction: column;
  input {
    margin-bottom: 32px;
    border-radius: 16px;
    border: none;
    outline: none ;
    background: white;
    padding: 12px 24px;
  }
`

export const Title = styled.div`
  font-size: 48px;
  margin-bottom: 32px;
`

export const Error = styled.div`
  font-size: 24px;
  color: red;
  margin-top: 16px;
`
