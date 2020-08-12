import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCloudSun, faTint } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import convertKevinToCelcius from '../utils/convertKevinToCelcius';

import {
  Container,
  Main,
  WeatherSection,
  Form,
  Content,
  Location,
  Temperature,
  Humidity
} from './styles';

// Components
import Input from '../components/Input';
import { Button } from '../components/Button';

// add icons in package
library.add(faCloudSun, faTint);

interface cityProps {
  humidity: number;
  temp: number;
  name: string;
  country: string;
  weather_description: string;
}

const Home: React.FC = () => {

  const [searchCity, setSearchCity] = useState('');
  const [city, setCity] = useState<cityProps | null>(null);

  function handleSeacrhWeather() {

    axios.get('http://api.openweathermap.org/data/2.5/weather', {
      params: {
        appid: 'b656819b099f4389047e7edd408cbe9f',
        q: searchCity,
      }
    }).then(response => {
      console.log(response);

      const temp = convertKevinToCelcius(response.data.main.temp);

      setCity({
        name: response.data.name,
        humidity: response.data.main.humidity,
        temp,
        country: response.data.sys.country,
        weather_description: response.data.weather[0].description
      });
    });
  }

  return (
    <Container>
      <Main>
        <WeatherSection>
          <Form>
            <Input name="Cidade" label="Cidade" onChange={e => setSearchCity(e.target.value)} />
            <Button type="button" onClick={handleSeacrhWeather}> Buscar</Button>
          </Form>
          {city &&
            <Content>
              <FontAwesomeIcon icon={['fas', 'cloud-sun']} />
              <Location>

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

              <Humidity>
                <FontAwesomeIcon icon={['fas', 'tint']} />
                <span>
                  {city.humidity}
                <span>%</span>
                </span>
              </Humidity>
            </Content>
          }
        </WeatherSection>
      </Main>
    </Container>
  );
};

export default Home;