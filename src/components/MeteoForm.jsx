import { useEffect, useState } from "react";
import logometeo from "../img/logometeo.png";

const MeteoForm = () => {
  const [weatherData, setWeatherData] = useState({
    data: null,
    search: "Napoli",
    cityName: "Napoli",
    countryCode: "IT",
    temp: "",
    maxTemp: null,
    minTemp: null,
    myapi: "2a0e8387bf39270459e34d376bc4ec12",
  });

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weatherData.search}&appid=${weatherData.myapi}&units=metric`;
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.base === "stations") {
          setWeatherData((prevState) => ({
            ...prevState,
            data: data,
            cityName: data.name.replace("Province", "").trim(),
            temp: data.main.temp,
            maxTemp: data.main.temp_max.toFixed(1),
            minTemp: data.main.temp_min.toFixed(1),
          }));
          console.log(data);
        } else {
          console.log("errore");
        }
      });
  }, [weatherData.search]);

  function changed(e) {
    setWeatherData((prevState) => ({
      ...prevState,
      search: e.target.value.toLocaleLowerCase().trim(),
    }));
    console.log(weatherData.search);
  }

  return (
    <div className="App">
      <div className={"main-content"}>
        <div className={"header-content"}>
          <img src={logometeo} alt="logo-logometeo"></img>
          <h3>meteocasolla.com</h3>
          <div className={"input"}>
            <input
              onChange={changed}
              placeholder={"Enter a City..."}
              type="text"
            ></input>
          </div>
          <div className={"container-weather"}>
            <div className={"alt-weather"}>
              <h1 id={"cityname"}>
                {weatherData.cityName ? weatherData.cityName : "Loading"}
              </h1>
              <div className={"weather-info"}>
                <div className={"weather-class"}>
                  <h2>Temp: {weatherData.temp}</h2>
                </div>
                <div className={"weather-class"}>
                  <h2>Max Per Temp: {weatherData.maxTemp}</h2>
                </div>
                <div className={"weather-class-top"}>
                  <h2>Min Per Temp: {weatherData.minTemp}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeteoForm;
