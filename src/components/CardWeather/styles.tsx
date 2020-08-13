import styled, { css } from 'styled-components';

interface CardProps {
  cardRotate: boolean;
}

const Scene = styled.div`
    
    max-width: 90vw;
    width: 14rem;
    height: 8rem;
    perspective: 600px;

    margin: 0px 10px 15px 10px;
`;

const Card = styled.button<CardProps>`
  width: 100%;
  height: 100%;
  position: relative;
  
  transition: transform 1s;
  transform-style: preserve-3d;

  color: var(--white);

  & :hover, :focus{
    outline: none;
  }

  
  ${({ cardRotate }) => cardRotate ? css`transform: rotateY(180deg);` : ''} 
`;

const CardModel = styled.div`
    background: var(--secondary-blue);
    
    position: absolute;
    top: 0;

    height: 100%;
    width: 100%;
    backface-visibility: hidden;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    box-shadow: 2px 2px 2px rgba(0,0,0,0.3);
`;

const CardBack = styled(CardModel)`
    transform: rotateY( 180deg );
`;

const CardFront = styled(CardModel)`
  font-size: 3.6rem;
`;

const Container = styled.div`
    display: flex;
`;

const Placing = styled.div`
    background: var(--white);
    width: 6rem;
    height: 4rem;

    border-bottom-right-radius: 65%;

    font-family: 'Poppins';
    font-size: 2.6rem;
    color: var(--secondary-blue);
    text-align: center;
`;

const Weather = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

 img{
   width: 4rem;
 }

    span{
        font-size: 2.4rem;

        span{
            font-size: 0.5em;
        }
    }
`;

const WeatherDescription = styled.span`
  width: 100%;

  margin: 15px 0;

  font-size: 1.2rem;
  text-align: center;
`;

const Footer = styled.footer`
    margin-bottom: 10px;

    font-size: 2rem;
    text-align: center;
`;

const FooterBack = styled.footer`
    
    div{
      max-width: 6rem;
      max-height: 2.6rem;
  
      font-size: 1.5rem;
    }
`;

export { Scene, Card, CardBack, CardFront, Placing, Container, Weather, Footer, FooterBack, WeatherDescription };