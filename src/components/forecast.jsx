import { useSelector } from "react-redux";
import { groupForecastByDay } from "../utils";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ type }) => {
  const { forecast } = useSelector((state) => state.weather);

  if (!forecast || forecast.length === 0) return null;

  // forecast dei prossimi 5 giorni
  const grouped = groupForecastByDay(forecast).slice(1, 6);

  // forecast delle prossime ore
  const now = new Date();

  // Previsioni orarie dalla data/ora corrente in poi
  const upcomingForecast = forecast
    .filter((item) => {
      const itemDate = new Date(item.dt_txt);
      return itemDate >= now;
    })
    .slice(0, 5); // Prendiamo i prossimi 5 blocchi da 3h

  return (
    <>
      {type === "daily" ? (
        <div>
          <div className="d-flex flex-wrap gap-2 p-3">
            {grouped.map((day) => {
              const dateObj = new Date(day.date);
              const dayName = dateObj.toLocaleDateString("it-IT", {
                weekday: "short",
              });

              return (
                <div
                  key={day.date}
                  className="text-center"
                  style={{ width: 100 }}
                >
                  <img
                    src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                    alt=""
                  />
                  <p className="text-light">{dayName}</p>
                  <p className="text-light">{day.avgTemp}°C</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="d-flex gap-2 p-2">
          {upcomingForecast.map((item, index) => {
            const time = new Date(item.dt_txt).toLocaleTimeString("it-IT", {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div key={index} className="text-center" style={{ width: 100 }}>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />
                <p className="text-light">{time}</p>
                <p className="text-light">{Math.round(item.main.temp)}°C</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
