import { useSelector } from "react-redux";
import { useState } from "react";
import Search from "./components/search";
import CurrentWeather from "./components/currentWeather";
import Forecast from "./components/forecast";
import "./App.css";

function App() {
  const [showMainCard, setShowMainCard] = useState(true);
  const weather = useSelector((state) => state.weather.current);

  const today = new Date();
  const giorno = today.toLocaleDateString("it-IT", { weekday: "long" });
  const giornoNumero = today.getDate();
  const mese = today.toLocaleDateString("it-IT", { month: "long" });

  const titolo = `${
    giorno.charAt(0).toUpperCase() + giorno.slice(1)
  }, ${giornoNumero} ${mese.charAt(0).toUpperCase() + mese.slice(1)}`;

  return (
    <div className="app-container">
      <h1 class="text-light" className="mt-3 text-light display-4">
        <small>React-Redux</small> METEO APP
      </h1>
      <Search />

      <div className="card card-container">
        {weather && (
          <header className="text-center text-light mt-2">
            <h2 className="display-5">{titolo}</h2>
            <h1>
              {weather?.name}, {weather?.sys?.country}
            </h1>
          </header>
        )}

        <div className="card-content">
          {showMainCard ? (
            <>
              <CurrentWeather />
              <Forecast type="daily" />
            </>
          ) : (
            <>
              <CurrentWeather type="details" />
              <Forecast type="hourly" />
            </>
          )}
        </div>
      </div>

      <footer className="text-center">
        <span
          onClick={() => setShowMainCard(true)}
          style={{ cursor: "pointer" }}
        >
          ●
        </span>
        <span
          onClick={() => setShowMainCard(false)}
          style={{ cursor: "pointer", opacity: 0.5 }}
        >
          ●
        </span>
      </footer>
    </div>
  );
}

export default App;
