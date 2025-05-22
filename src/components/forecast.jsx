import { useSelector } from "react-redux";
import { groupForecastByDay } from "../utils";

function Forecast() {
  const { forecast } = useSelector((state) => state.weather);

  if (!forecast || forecast.length === 0) return null;

  // forecast dei prossimi 5 giorni
  const grouped = groupForecastByDay(forecast).slice(1, 6);

  return (
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
  );
}

export default Forecast;
