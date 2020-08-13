/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import { Scene, Card, Placing, Container, Weather, Footer, CardFront, CardBack, WeatherDescription, FooterBack } from './styles';
import Humidity from '../Humidity';

export interface cityProps {
  id: number;
  humidity: number;
  temp: number;
  name: string;
  country: string;
  weather_description: string;
  icon: string;
  search_time: string;
}

interface CardProps {
  placing: number,
  city: cityProps
}

const CardWeather: React.FC<CardProps> = ({ placing, city }) => {

  const [cardRotate, setCardRotate] = useState(false);

  // rotate card when click it
  function handleRotateCard() {
    setCardRotate(!cardRotate);
  }

  return (
    <Scene>
      <Card onClick={handleRotateCard} cardRotate={cardRotate}>
        <CardFront>
          <Container>
            <Placing>
              {placing}°
            </Placing>

            <Weather>
              <img src={`http://openweathermap.org/img/wn/${city.icon}@2x.png`} alt="iconWeather" />
              <span>
                {city.temp}°
                <span>
                  C
                </span>
              </span>
            </Weather>
          </Container>

          <Footer>
            {city.name}
          </Footer>
        </CardFront>

        <CardBack>

          <Container>
            <WeatherDescription>
              {city.weather_description}
            </WeatherDescription>
          </Container>

          <FooterBack>
            <Humidity humidity={city.humidity} />
          </FooterBack>
        </CardBack>
      </Card>
    </Scene>
  );
};

export default CardWeather;