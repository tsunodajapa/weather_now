import React, { useState, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUmbrella, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { format } from 'date-fns';

import * as weatherServices from '../../services/weather';
// import pt from 'date-fns/locales/pt';

import {
  Container,
  Main,
  WeatherSection,
  Form,
  Content,
  Location,
  Temperature,
  ContainerHistoric,
  LatestSearchesSection,
  MostSearchedSection,
  Title,
  Wrapper,
  Table,
  MessageContainer,
  TableContainer
} from './styles';

// Components
import Input from '../../components/Input';
import Button from '../../components/Button';
import CardWeather, { cityProps } from '../../components/CardWeather';
import Humidity from '../../components/Humidity';
import Modal from '../../components/Modal';

// add icons in package
library.add(faUmbrella, faArrowRight);

interface cityGroup {
  city: cityProps;
  count: number
}

const Home: React.FC = () => {

  const [searchCity, setSearchCity] = useState('');
  const [city, setCity] = useState<cityProps>();
  const [topFive, setTopFive] = useState<cityGroup[]>();
  const [citiesGroup, setCitiesGroup] = useState<cityGroup[]>();
  const [latestSearches, setLatestSearches] = useState<cityProps[]>();
  const [completeHistory, setCompleteHistory] = useState<cityProps[]>();

  const [isOpenModal, setIsOpenModal] = useState(true);

  async function handleSeacrhWeather(e: FormEvent) {

    e.preventDefault();

    try {

      // returns the city's weather as a parameter
      const response = await weatherServices.getWeather(searchCity);

      // format date
      await formatWeather(response);

      // checkTopFive();

    } catch (err) {
      console.log(err);
    }

  }

  // useEffect(()=> checkTopFive, [city]);

  async function formatWeather(response: any) {
    const formattedDate = format(
      new Date(),
      'dd/MM/yyyy HH:mm:s'
    );

    const cityWeather = {
      id: response.data.id,
      name: response.data.name,
      humidity: response.data.main.humidity,
      temp: Math.round(response.data.main.temp),
      country: response.data.sys.country,
      weather_description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      search_time: formattedDate
    };

    setCity(cityWeather);

    // update list of latest searches
    if (latestSearches && completeHistory) {
      setCompleteHistory([cityWeather, ...completeHistory]);
      setLatestSearches([cityWeather, latestSearches[0]]);
    } else {
      setCompleteHistory([cityWeather]);
      setLatestSearches([cityWeather]);
    }

    checkTopFive(cityWeather);
  }


  function checkTopFive(cityWeather: cityProps) {

    let newCitiesGroup;

    if (citiesGroup) {
      const [cityFiltered] = citiesGroup.filter(cityGroup => cityGroup.city.id === cityWeather.id);

      if (cityFiltered) {
        const updatedCitiesGroup = citiesGroup.map(cityGroup => {
          if (cityGroup.city.id === cityFiltered.city.id) {
            return {
              ...cityGroup,
              count: ++cityGroup.count
            };
          }

          return cityGroup;
        });
        newCitiesGroup = [...updatedCitiesGroup];
        setCitiesGroup(newCitiesGroup);
      } else {
        newCitiesGroup = [...citiesGroup, {
          city: cityWeather,
          count: 1
        }];

        setCitiesGroup(newCitiesGroup);
      }

    } else {
      newCitiesGroup = [{
        city: cityWeather,
        count: 1
      }];

      setCitiesGroup(newCitiesGroup);
    }

    const sortCitiesGroup = newCitiesGroup.sort((cityA, cityB) => {
      if (cityA.count > cityB.count) {
        return -1;
      } else if (cityA.count < cityB.count) {
        return 1;
      } else {
        return 0;
      }
    });

    const slicedCitiesGroup = sortCitiesGroup.slice(0, 6);

    setTopFive(slicedCitiesGroup);

  }

  function handleToggleModal() {
    setIsOpenModal(!isOpenModal);
  }

  return (
    <>
      <Container>
        <Main>
          <WeatherSection>
            <Form onSubmit={handleSeacrhWeather}>
              <Input name="city" label="City" onChange={e => setSearchCity(e.target.value)} />
              <Button type="submit"> Buscar</Button>
            </Form>
            {city !== undefined ?
              <Content>
                <Location>
                  <img src={`http://openweathermap.org/img/wn/${city.icon}@2x.png`} alt="" />
                  <span>
                    {city.name}
                  </span>
                  <span>{city.country}</span>
                </Location>

                <Temperature>
                  <span>
                    {city.temp}°
                <span>C</span>
                  </span>
                  <br />
                  <span>
                    {city.weather_description}
                  </span>
                </Temperature>

                <Humidity humidity={city.humidity} />
              </Content>

              :
              <MessageContainer>
                <FontAwesomeIcon icon={['fas', 'umbrella']} />
                <span>
                  Enter the name of a city above
              </span>
              </MessageContainer>
            }
          </WeatherSection>
          <ContainerHistoric>
            <MostSearchedSection>
              <Title>Top 5</Title>

              <Wrapper>
                {
                  topFive ? topFive.map((cityGroup, index) => (
                    <CardWeather key={cityGroup.city.id} placing={index + 1} city={cityGroup.city} />
                  )) :
                    <div>
                      <h4>
                        The 5 most searched will appear here
                    </h4>
                    </div>
                }

              </Wrapper>
            </MostSearchedSection>

            <LatestSearchesSection>
              <div>
                <Title>Latest Searches</Title>
                <Button type="button" background="transparent" onClick={handleToggleModal}>
                  Complete history here
                <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                </Button>
              </div>

              <div>
                <Table>
                  <thead>
                    <tr>
                      <th>City</th>
                      <th>Country</th>
                      <th>Search time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      latestSearches ?

                        latestSearches.map((city, index) => (
                          <tr key={index}>
                            <td>{city.name}</td>
                            <td>{city.country}</td>
                            <td>{city.search_time}</td>
                          </tr>
                        ))
                        :

                        <tr>
                          <td colSpan={3}>
                            Your search history will appear here
                        </td>
                        </tr>
                    }
                  </tbody>
                </Table>
              </div>
            </LatestSearchesSection>
          </ContainerHistoric>
        </Main>
      </Container>
      <Modal isOpen={isOpenModal} handleToggleModal={handleToggleModal}>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>City</th>
                <th>Country</th>
                <th>Search time</th>
              </tr>
            </thead>
            <tbody>
              {
                completeHistory ?

                  completeHistory.map((city, index) => (
                    <tr key={index}>
                      <td>{city.name}</td>
                      <td>{city.country}</td>
                      <td>{city.search_time}</td>
                    </tr>
                  ))
                  :

                  <tr>
                    <td colSpan={3}>
                      Your search history will appear here
                        </td>
                  </tr>
              }
            </tbody>
          </Table>
        </TableContainer>
      </Modal>
    </>
  );
};

export default Home;