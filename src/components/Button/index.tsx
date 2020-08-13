import styled, {css} from 'styled-components';

interface ButtonProps{
  background?: string;
}

const Button = styled.button<ButtonProps>`

    ${({background}) => background ? css`background: ${background}` : css`background: var(--white);` }
    
    height: 2.4rem;
    width: 15rem;

    border-radius: 5px;

    color: var(--primary-blue);
    font-size: 1.2rem;

    cursor: pointer;

    &:focus{
      outline: none
    }

    svg{
      margin-left: 5px;
    }
  
`;

export default Button;