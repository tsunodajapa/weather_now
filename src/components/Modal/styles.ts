import styled, { css } from 'styled-components';

interface ModalProps {
  isOpen: boolean;
}

const Container = styled.div<ModalProps>`
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;

  ${({ isOpen }) =>
    isOpen
      ? css`
          display: flex;
        `
      : css`
          display: none;
        `};
  justify-content: center;

  z-index: 1001;

  padding: 15px;
`;

export { Container };
