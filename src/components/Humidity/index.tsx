/* eslint-disable react/prop-types */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTint } from '@fortawesome/free-solid-svg-icons';

import { Container } from './styles';

// add icons in package
library.add(faTint);

interface HumidityProps {
  humidity: number;
}

const Humidity: React.FC<HumidityProps> = ({ humidity }) => {
  return (
    <Container>
      <FontAwesomeIcon icon={['fas', 'tint']} />
      <span>
        {humidity}
        <span>%</span>
      </span>
    </Container>
  );
};

export default Humidity;