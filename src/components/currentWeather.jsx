import { useSelector } from "react-redux";

function CurrentWeather() {
  const { current, status, error } = useSelector((state) => state.weather);

  if (status === "loading") return <p>Caricamento...</p>;
  if (status === "failed") return <p>Errore: {error}</p>;
  if (!current) return null;

  const {
    // name,
    weather,
    main: { temp, humidity },
    wind: { speed },
    sys: { sunrise, sunset },
    // dt,
  } = current;

  const iconCode = weather[0].icon;
  const description = weather[0].description;

  const formatTime = (unix) =>
    new Date(unix * 1000).toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div>
      <img
        src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
        alt={description}
        width={200}
      />
      <p className="text-capitalize text-center text-light display-6">
        {description}
      </p>
      <h3 className="display-1 text-center text-light">{Math.round(temp)}°C</h3>
      {/* <ul className="list-unstyled">
        <li>🌬 Vento: {speed} m/s</li>
        <li>💧 Umidità: {humidity}%</li>
        <li>🌅 Alba: {formatTime(sunrise)}</li>
        <li>🌇 Tramonto: {formatTime(sunset)}</li>
      </ul> */}
    </div>
  );
}

export default CurrentWeather;
