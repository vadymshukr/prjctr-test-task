import styled from 'styled-components';

export const ButtonCommon = styled.button`
  color: white;
  padding: 4px 8px;
  font-size: 18px;
  line-height: 1;
  height: 32px;
  min-width: 240px;
  font-family: 'Roboto', sans-serif;
  outline: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: #0d6efd;
`

export const MainButton = styled(ButtonCommon)`
  background: #198754;
`

export const WarningButton = styled(ButtonCommon)`
  background: #dc3545;

`