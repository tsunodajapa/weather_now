import styled from 'styled-components';

const Container = styled.div`
  background: var(--white);
  width: 10rem;
  height: 5rem;

  align-self: flex-start;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 35px;
  border-radius: 0 4rem 4rem 0;

  color: #26bfef;
  font-size: 3rem;
  text-align: center;

  span {
    margin-left: 15px;

    span {
      margin: 0;
      font-size: 0.5em;
    }
  }
`;

export { Container };
