import styled from 'styled-components';

const Block = styled.div`
  position: relative;

  color: var(--white);

  label {
    background: var(--primary-pink);
    position: absolute;
    top: -12px;
    left: 15px;

    font-size: 1.2rem;
  }

  input {
    height: 2.4rem;
    width: 15rem;

    border: 2px solid var(--white);
    border-radius: 5px;
    padding: 5px 10px;
 
    font-size: 1.2rem;
  }

  input:focus {
    outline: none;
  }
`;

export { Block };
