import React, { useEffect, useState, FormEvent } from 'react';
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

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [message, setMessage] = useState('Enter the name of a city above');

  async function handleSeacrhWeather(e: FormEvent) {

    // stop default event submit
    e.preventDefault();

    try {

      // returns the city's weather as a parameter
      const response = await weatherServices.getWeather(searchCity);

      // format date
      const cityWeather = await formatWeather(response);
      setCity(cityWeather);

      // update list of latest searches and complete history
      if (latestSearches && completeHistory) {
        setCompleteHistory([cityWeather, ...completeHistory]);
        setLatestSearches([cityWeather, latestSearches[0]]);
      } else {
        setCompleteHistory([cityWeather]);
        setLatestSearches([cityWeather]);
      }

      setMessage('');

    } catch (err) {
      const { status } = err.response;

      setCity(undefined);
      setMessage('');
      console.log(status);
      if (status == 404) {
        console.log('error 404');

        setMessage('The city you are looking for is not in our database');
      } else if (status == 400) {
        setMessage('Invalid parameter, enter a valid city');
      }
    }

  }

  // execute after it changes the city
  // counts the cities with the same id and groups
  useEffect(() => {
    if (city) {
      if (citiesGroup) {
        const [cityFiltered] = citiesGroup.filter(cityGroup => cityGroup.city.id === city.id);

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
          setCitiesGroup([...updatedCitiesGroup]);
        } else {

          setCitiesGroup([...citiesGroup, {
            city: city,
            count: 1
          }]);
        }

      } else {
        setCitiesGroup([{
          city: city,
          count: 1
        }]);
      }
    }
  }, [city]);

  // execute after it changes the cities group
  // orders the group from largest to smallest and selects the 5 first
  useEffect(() => {
    if (citiesGroup) {
      const sortCitiesGroup = citiesGroup.sort((cityA, cityB) => {
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
  }, [citiesGroup]);

  async function formatWeather(response: any) {

    // format date
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

    return cityWeather;
  }

  function handleToggleModal() {
    setIsOpenModal(!isOpenModal);
  }
  
  //updates the top five every 15 seconds
  setTimeout(UpdataWeatherTopFive, 15000);

  async function UpdataWeatherTopFive() {
    if (topFive) {
      const topFiveNewWeather = topFive.map(async cityGroup => {
        const response = await weatherServices.getWeather(cityGroup.city.name);

        // format date
        const cityWeather = await formatWeather(response);

        return {
          city: cityWeather,
          count: cityGroup.count
        };
      });

      // execute all promisses and update top five
      Promise.all(topFiveNewWeather).then(topFiveUpdated => {
        console.log('Updated Top Five');

        setTopFive(topFiveUpdated);
      });
    }
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

            <Content render={city ? true : false}>
              {city &&
                <>
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
                </>
              }
            </Content>
            {message &&
              <MessageContainer>
                <FontAwesomeIcon icon={['fas', 'umbrella']} />
                <span>
                  {message}
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