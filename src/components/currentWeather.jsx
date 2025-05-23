import { useSelector } from "react-redux";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ type }) => {
  const { current } = useSelector((state) => state.weather);

  if (!current) return null;

  const {
    // name,
    weather,
    main: { temp, humidity, temp_max, temp_min },
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
    <>
      {type === "main" ? (
        <div>
          <img
            src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
            alt={description}
            width={100}
            className="ms-5"
          />
          <p className="text-capitalize text-center text-light display-6">
            {description}
          </p>
          <h3 className="display-3 text-center text-light">
            {Math.round(temp)}°C
          </h3>
        </div>
      ) : (
        <div className="info-card">
          <ul className="list-group">
            <li className="d-flex justify-content-between">
              <div className="ms-2 me-auto text-secondary">
                Temperatura minima
              </div>
              <span className="me-2 text-secondary">{temp_min}°c</span>
            </li>
            <li className="d-flex justify-content-between mt-3">
              <div className="ms-2 me-auto text-secondary">
                Temperatura massima
              </div>
              <span className="me-2 text-secondary">{temp_max}°c</span>
            </li>
            <li className="d-flex justify-content-between mt-3">
              <div className="ms-2 me-auto text-secondary">Vento</div>
              <span className="me-2 text-secondary">{speed} m/s</span>
            </li>
            <li className="d-flex justify-content-between mt-3">
              <div className="ms-2 me-auto text-secondary">Umidità</div>
              <span className="me-2 text-secondary">{humidity}%</span>
            </li>
            <li className="d-flex justify-content-between mt-3">
              <div className="ms-2 me-auto text-secondary">Alba</div>
              <span className="me-2 text-secondary">{formatTime(sunrise)}</span>
            </li>
            <li className="d-flex justify-content-between mt-3">
              <div className="ms-2 me-auto text-secondary">Tramonto</div>
              <span className="me-2 text-secondary">{formatTime(sunset)}</span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
