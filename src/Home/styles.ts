import styled from 'styled-components';

const Container = styled.div`
  /* padding-right: 15px;
  padding-left: 15px;
  /* margin-right: auto;
  margin-left: auto; */
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

const WeatherSection = styled.section`
  background: var(--primary-pink);
  height: 100vh;

  padding-top: 15px;
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
`;

const Location = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span:nth-child(1) {
    font-size: 4.8rem;
    font-weight: bold;
  }

  span:nth-child(2) {
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

const Humidity = styled.div`
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

export {
  Container,
  Main,
  WeatherSection,
  Form,
  Content,
  Location,
  Temperature,
  Humidity,
};
