/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

import { Container } from './styles';

interface ModalProps {
  isOpen: boolean;
  handleToggleModal(): void
}

const Modal: React.FC<ModalProps> = (props) => {

  // block overfflow body when modal is open
  useEffect(() => {
    if(props.isOpen){
      document.body.style.overflow = 'hidden';
    }else{
      document.body.style.overflow = 'auto';
    }
  }, [props.isOpen]);

  return (
    <Container isOpen={props.isOpen} onClick={props.handleToggleModal}>
      {props.children}
    </Container>
  );
};

export default Modal;