import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContainerProps {
  variant: ButtonVariant;
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;

  background-color: ${({ variant }) => buttonVariants[variant]};
  
  //   OU
  
  /* ${props => {
    return `background-color: ${buttonVariants[props.variant]}`}
  } */

  //  OU AINDA

  /* ${props => {
    return css`
      background-color: ${buttonVariants[props.variant]}
    `}
  } */
`;