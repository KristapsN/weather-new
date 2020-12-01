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
  compareHandler: ()=> void;

};

const CompareCard = ({ temp, minTemp, maxTemp, weather, icon, 
  feelsLike, description, city, compareHandler }: Props) => {
  return (
    <>
      <h1 className="city--name">{city}</h1>
      <div className='card--wrapper'>
        <div className="main-forcast">
          <div className='main--weather'>
            <img src={icon} alt="" />
            <span>{weather}</span>
          </div>
          <h1 className='temp'>{temp}°</h1>
        </div>
        <div className="secondary--forcast">
          <h2>Feels like {feelsLike}°</h2>
          <span>min {minTemp}° </span>
          <span>max {maxTemp}° </span>
          <p>{description}</p>
          <button type="button" onClick={()=> compareHandler()}>Add to compare</button>
        </div>
      </div> 
    </>
  );
};

export default CompareCard; 