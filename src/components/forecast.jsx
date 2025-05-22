import { useSelector } from "react-redux";
import { groupForecastByDay } from "../utils";

function Forecast() {
  const { forecast } = useSelector((state) => state.weather);

  if (!forecast || forecast.length === 0) return null;

  const grouped = groupForecastByDay(forecast).slice(0, 5); // Solo 5 giorni

  return (
    <div className="card shadow-sm p-4">
      <h3 className="mb-3">Previsioni prossimi giorni</h3>
      <div className="d-flex flex-wrap gap-3">
        {grouped.map((day) => {
          const dateObj = new Date(day.date);
          const dayName = dateObj.toLocaleDateString("it-IT", {
            weekday: "short",
          });

          return (
            <div
              key={day.date}
              className="text-center border rounded p-2"
              style={{ width: 100 }}
            >
              <div>{dayName}</div>
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt=""
              />
              <div>{day.avgTemp}°C</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;
