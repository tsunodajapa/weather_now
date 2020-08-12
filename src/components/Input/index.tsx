import React, {InputHTMLAttributes} from 'react';

import { Block } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    label: string;
}

// eslint-disable-next-line react/prop-types
const Input: React.FC<InputProps> = ({name, label, ...rest}) => {
    return (
        <Block>
            <label htmlFor={name}> {label} </label>
            <input type="text" id={name} {...rest} />
        </Block>
    );
};

export default Input;