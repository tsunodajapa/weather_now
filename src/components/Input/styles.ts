import styled from 'styled-components';

const Block = styled.div`
  position: relative;

  color: var(--white);

  input:not(:placeholder-shown) + label {
    display: none;
  }

  label {
    position: absolute;
    top: 0.5rem;
    left: 2.4rem;
    height: 100%;
    width: 100%;
    font-size: 1.2rem;
    border-radius: 10px;
  }

  input {
    height: 2.4rem;
    width: 15rem;

    background: var(--secondary-blue);
    border-radius: 10px;
    padding: 5px 2.4rem;

    font-size: 1.2rem;

    transition: background 0.6s ease;
  }

  label::before {
    content: " ";
    position: absolute;
    top: -0.2rem;
    left: -1.6rem;

    min-height: 1.2rem;
    min-width: 1.2rem;
    border-radius: 50%;
    background: #fff;
    transition: 0.8s;
  }

  label div {
    position: absolute;
    top: 0.6rem;
    left: -1.6rem;

    min-height: 0.8rem;
    min-width: 0.2rem;
    background: #fff;
    transform: rotate(45deg);
  }

  input:focus {
    outline: none;
  }

  input:focus + label::before {
    min-height: 2.4rem;
    min-width: 15rem;
    top: -0.4rem;
    left: -1.8;
    z-index: 1001;
    opacity: 0;
  }

  input:focus,
  input:not(:placeholder-shown) {
    background: var(--white);
    padding: 5px 0.4rem;
  }
`;

export { Block };
