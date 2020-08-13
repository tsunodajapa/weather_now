import React, { InputHTMLAttributes } from 'react';

import { Block } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string;
}

// eslint-disable-next-line react/prop-types
const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  return (
    <Block>
      <input type="text" placeholder=" " id={name} {...rest} />
      <label htmlFor={name}> {label}
        <div></div>
      </label>
    </Block>
  );
};

export default Input;