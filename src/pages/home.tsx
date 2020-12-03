import React, { useEffect, useState } from 'react';
import './pages.css';
import 'flexboxgrid';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import WeatherCard from '../components/weatherCard/weatherCard';
import CompareCard from '../components/weatherCard/compareCard';
import TextInput from '../components/input/textInput';
import Error from '../components/weatherCard/errorCard';

type Forcast = {
  temp: number | undefined;
  feels_like: number | undefined;
  temp_min: number | undefined;
  temp_max: number | undefined;

};
type Weather = {
  main: string | undefined;
  description: string | undefined;
  icon: string | undefined;
};

type CityList = {
  name: string | undefined;
  open: boolean | undefined;
  temp: number | undefined;
  main: string | undefined;
  description: string | undefined;
  icon: string | undefined;
  feels_like: number | undefined;
  temp_min: number | undefined;
  temp_max: number | undefined;
  color: string | undefined;
  id: string | undefined;
};


const Home = () => {

  const cityId = uuidv4();

  axios.defaults.params = {
    appid: '1d9b71f98edb0748224fcf68d948a166'
  };

  const [forcast, setForcast] = useState<Forcast>();
  const [weather, setWeather] = useState<Weather>();
  const [city, setCity] = useState('Riga');
  const [inputCity, setInputCity] = useState('');
  const [cityList, setCityList] = useState<CityList[]>([]);
  const [errorInfo, setErrorInfo] = useState(false);

  const objectToApiUrl = (params: Object) => {
    return Object.entries(params).reduce((acc, [key, value]) => {
      let accCopy = acc;
      accCopy += `${key}=${value}&`;
      return accCopy;
    }, 'https://api.openweathermap.org/data/2.5/weather?');
  };

  useEffect(() => {
    const url = objectToApiUrl({
      q: city,
      units: 'metric',
    });
    axios.get(url)
      .then(response => {
        console.log(response.data);
        setWeather(response.data.weather[0]);
        setForcast(response.data.main);
        setErrorInfo(false);
      })
      .catch(() => {
        console.log('Error!!!');
        setErrorInfo(true);
      }
      );

  }, [city]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCity(e.target.value);
  };
  const cityClickHandler = () => {
    setCity(inputCity);
    setInputCity('');
  };
  const compareHandler = (idInfo: string, cityInfo: string) => {

    const newCity = cityList.find(item => 
      item.name === cityInfo && item.open === true);

    if (newCity) {
      console.log('Already exist');

    } else {
      setCityList([
        ...cityList,
        {
          name: city,
          open: true,
          temp: forcast?.temp,
          main: weather?.main,
          description: weather?.description,
          icon: weather?.icon,
          feels_like: forcast?.feels_like,
          temp_min: forcast?.temp_min,
          temp_max: forcast?.temp_max,
          color: tempColor,
          id: idInfo
        }
      ]);
    }
  };

  const closeHandler = (comp: string | undefined) => {
    cityList.map((item) => {
      const newCityList = [...cityList];
      // eslint-disable-next-line no-param-reassign
      item.id === comp && (item.open = !item.open);
      setCityList(newCityList);
    }
    );
  };

  let red = 255;
  let green = 255;
  let blue = 255;
  let tempImage = 1056;

  // @ts-ignore 
  if (forcast?.temp > 0) {
    // @ts-ignore 
    green -= forcast?.temp * 3.12;
    // @ts-ignore 
    blue -= forcast?.temp * 5.1;
    // @ts-ignore  
  } else if (forcast?.temp <= 0) {
    // @ts-ignore 
    green += forcast?.temp * 3.12;
    // @ts-ignore 
    red += forcast?.temp * 5.1;
  }
  const tempColor = `${red},${green},${blue},0.5`;
  // @ts-ignore 
  if (weather?.main === 'Snow') {
    tempImage = 1000;
  } else if (weather?.main === 'Rain') {
    tempImage = 115;
  } else if (weather?.main === 'Sunny') {
    tempImage = 206;
  } else if (weather?.main === 'Clouds') {
    tempImage = 1056;
  } else {
    tempImage = 114;
  }

  const background = `https://picsum.photos/id/${tempImage}/1000/350/?blur=7`;
  const iconWeather = `http://openweathermap.org/img/wn/${weather?.icon}@2x.png`;


  return (
    <div className='container'>
      <div className="row">
        <div
          className="col-md-offset-3 col-md-6 col-xs-12"
        >
          <TextInput
            value={inputCity}
            cityInputHandler={(e) => inputChangeHandler(e)}
            cityClickHandler={cityClickHandler}
          />
          <div
            className="card--background"
            style={{
              backgroundImage: `url(${background})`
            }}
          >
            <div
              className="color--overlay"
              style={{
                backgroundColor: `rgb(${tempColor})`,
              }}
            >
              {errorInfo && 
              <Error
                errorTitle="Sorry, we did not found this city"
                errorMesage="Please check if you have correct name of city."
              />}
              <WeatherCard
                city={city}
                temp={forcast?.temp}
                minTemp={forcast?.temp_min}
                maxTemp={forcast?.temp_max}
                weather={weather?.main}
                icon={iconWeather}
                feelsLike={forcast?.feels_like}
                description={weather?.description}
                compareHandler={() => compareHandler(cityId, city)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">

        {cityList.filter(item => item.open === true).map((item) =>
          // eslint-disable-next-line react/jsx-key
          <div className=" col-sm-6 col-xs-12 col-md-3">
            <div
              className="color--overlay__compare"
              style={{
                backgroundColor: `rgb(${item.color})`,
              }}
            >
              <CompareCard
                city={item.name}
                temp={item.temp}
                minTemp={item.temp_min}
                maxTemp={item.temp_max}
                weather={item.main}
                icon={`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
                feelsLike={item.feels_like}
                description={item.description}
                closeHandler={() => closeHandler(item.id)}
                idInfo={item.id}
              />
            </div>
          </div>
        )}
      </div>
    </div>

  );
};

export default Home;
