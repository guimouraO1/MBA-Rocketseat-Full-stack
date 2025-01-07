import styled, { css } from "styled-components";

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButttonContainerProps {
    variant: ButtonVariant;
}

const buttonVariants = {
    primary: 'LightSteelBlue',
    secondary: 'deepskyblue',
    danger: 'red',
    success: 'green'
}

export const ButtonContainer = styled.button<ButttonContainerProps>`
    width: 100px;
    height: 40px;
    border: 0;
    border-radius: 4px;
    margin: 8px;
    cursor: pointer;
    color: aliceblue;

    background-color: ${props => props.theme.primary};

    /* ${props => {
        return css`background-color: ${buttonVariants[props.variant]}`
    }} */
`