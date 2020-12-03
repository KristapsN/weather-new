import React from 'react';
import './weatherCard.css';

type Props = {
  temp: number | undefined;
  minTemp: number | undefined;
  maxTemp: number | undefined;
  weather: string | undefined;
  icon: string | undefined;
  feelsLike: number | undefined;
  description: string | undefined;
  city: string | undefined;
  closeHandler: () => void;
  idInfo: string | undefined;
 

};

const WeatherCard = ({ temp, minTemp, maxTemp, weather, icon,
  feelsLike, description, city, closeHandler, idInfo}: Props) => {
  return (
    <div className="compare--wrapper__big">
      <h1 className="city--name">{city}</h1>
      <div className='card--wrapper__compare'>
        <div className='main--weather'>
          <img src={icon} alt="" />
          <span>{weather}</span>
        </div>
        <h1 className='temp--small'>{temp}°</h1>
        <h2>Feels like {feelsLike}°</h2>
        <span>min {minTemp}° </span>
        <span>max {maxTemp}° </span>
        <p>{description}</p>  
      </div>
      <button className='close--button' type="button" onClick={() => closeHandler()}>X</button>
    </div>
  );
};

export default WeatherCard; 