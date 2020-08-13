/* eslint-disable react/prop-types */
import React from 'react';

import { Container } from './styles';

interface ModalProps{
  isOpen: boolean;
  handleToggleModal(): void
}

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <Container isOpen={props.isOpen} onClick={props.handleToggleModal}>
      {props.children}
    </Container>
  );
};

export default Modal;