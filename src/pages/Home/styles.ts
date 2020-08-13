import styled from 'styled-components';

const Container = styled.div`
  @media (min-width: 1024px) {
    max-height: calc(100vh + 45px);
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 15px;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const WeatherSection = styled.section`
  background: var(--primary-pink);
  height: 100vh;

  padding-top: 15px;

  @media (min-width: 1024px) {
    height: auto;
    width: 28rem;
  }
`;

const Form = styled.form`
  height: 15vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;

  div + button {
    margin-top: 10px;
  }
`;

const Content = styled.div`
  background: var(--secondary-pink);
  height: calc(85vh - 15px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  margin-top: 15px;
  border-radius: 45px 45px 0px 0px;

  > svg {
    width: 14rem !important;
    height: 14rem !important;
  }

  @media (min-width: 1024px) {
    height: 32rem;
  }
`;

const Location = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span:nth-of-type(1) {
    font-size: 3.2rem;
    font-weight: bold;
  }

  span:nth-of-type(2) {
    font-size: 1.4rem;
  }
`;

const Temperature = styled.div`
  margin-top: 25px;

  text-align: center;
  font-weight: bold;

  span:nth-child(1) {
    font-size: 4.8rem;

    span {
      font-size: 0.5em;
    }
  }

  span:nth-of-type(2) {
    font-size: 2.8rem;
  }
`;

const ContainerHistoric = styled.div`
  padding-right: 15px;
  padding-left: 15px;
  margin: 10px auto;

  @media (min-width: 1024px) {
    background: var(--white);
    margin: 0px;
    padding: 15px;
  }
`;

const MostSearchedSection = styled.section`
  h4 {
    color: var(--primary-pink);
  }

  @media (min-width: 1024px) {
    min-height: 14rem;
    min-width: 32rem;
  }
`;

const LatestSearchesSection = styled.section`
  div:first-child {
    display: flex;
    flex-direction: column;

    button {
      align-self: flex-end;
    }
  }

  div:nth-child(2) {
    overflow-x: auto;
    max-width: calc(100vw - 30px);
  }
`;

const Title = styled.h2`
  color: var(--primary-pink);
  text-align: center;
  margin: 15px 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;

const Table = styled.table`
  width: 100%;

  font-size: 1.2rem;
  text-align: center;

  tr th {
    background: var(--primary-pink);
    padding: 15px;
  }

  tr td {
    background: var(--secondary-pink);
    padding: 10px;
  }
`;

const MessageContainer = styled.div`
  height: 32rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    width: 8rem !important;
    height: 8rem !important;
  }

  span {
    font-family: "Archivo";
    font-size: 1.2rem;
  }
`;

const TableContainer = styled.div`
  overflow: auto;
  max-width: calc(100vw - 30px);
  max-height: calc(100vh - 30px);
`;

export {
  Container,
  Main,
  WeatherSection,
  Form,
  Content,
  Location,
  Temperature,
  ContainerHistoric,
  MostSearchedSection,
  LatestSearchesSection,
  Title,
  Wrapper,
  Table,
  MessageContainer,
  TableContainer
};
