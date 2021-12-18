import ContentEditable from 'react-contenteditable';
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 542px;
  margin: 0 auto;
  padding: 24px;
  background: white;
  border-radius: 8px;
`

export const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 32px;
`

export const FormGroup = styled.div`
  & + & {
    margin-top: 24px;
  }
`

export const ContentEditableStyled = styled(ContentEditable)`
  width: 100%;
  border-radius: 8px;
  border: 1px solid black;
  padding: 4px 12px;
  font-size: 14px;
white-space: nowrap;
  small {
    font-weight: 400;
    background: pink;
    font-size: 14px;
  }
`

export const Textarea = styled(ContentEditable)`
  resize: none;
  overflow-y: auto;
  height: 200px;
  padding: 4px 12px;

  width: 100%;
  border-radius: 8px;
  border: 1px solid black;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
`

export const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  display: block;
`

export const ButtonGroup = styled.div`
  display: flex;
  margin-top: 32px;
  Button + Button {
    margin-left: 16px;
  }
`

export const ButtonGroupControl = styled.div`
  display: flex;
  margin-top: 32px;
  Button + Button {
    margin-left: 16px;
  }
  Button {
    max-width: 100%;
    flex-grow: 1;
    min-width: auto;
  }
`