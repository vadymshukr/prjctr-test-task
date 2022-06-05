import styled from 'styled-components';
import { card } from '../../style';

export const Container = styled.div`
  & + & {
    margin-top: 24px;
  }
  
  ${card};
  
  display: flex;
  justify-content: space-between;
`

export const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: black;
  text-decoration: none;
  cursor: pointer;
`

export const Content = styled.div``

export const Main = styled.div``

export const ButtonsWrapper = styled.div`
  Button {
    display: block;
  }
  Button + Button {
    margin-top: 24px;
  }
`
