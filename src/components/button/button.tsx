import React from 'react';
import { ButtonCommon, MainButton, WarningButton } from './button-styled';

interface Props {
    type?: string
    onClick?: () => void
    children: React.ReactNode

}

export function Button({type, onClick, children} : Props) {
    switch (type) {
        case 'main':
            return (
                <MainButton onClick={onClick}>
                    {children}
                </MainButton>
            )
        case 'warning':
            return (
                <WarningButton onClick={onClick}>
                    {children}
                </WarningButton>
            )
        default:
            return (
                <ButtonCommon onClick={onClick}>
                    {children}
                </ButtonCommon>
            )
    }
}