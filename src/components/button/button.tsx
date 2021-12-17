import React from 'react'
import { ButtonCommon, MainButton, WarningButton } from './button-styled'

interface Props {
    type?: string;
    onClick?: (e?: any) => void;
    children: React.ReactNode;
    disabled?: boolean;
}

export const Button = ( { type, onClick, children, disabled } : Props) => {
    switch (type) {
        case 'main':
            return (
                <MainButton onClick={onClick} disabled={disabled}>
                    {children}
                </MainButton>
            )
        case 'warning':
            return (
                <WarningButton onClick={onClick} disabled={disabled}>
                    {children}
                </WarningButton>
            )
        default:
            return (
                <ButtonCommon onClick={onClick} disabled={disabled}>
                    {children}
                </ButtonCommon>
            )
    }
}