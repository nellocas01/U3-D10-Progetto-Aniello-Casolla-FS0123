import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentWeather, fetchForecast } from "../redux/reducers";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (!city.trim()) return;
    dispatch(fetchCurrentWeather(city));
    dispatch(fetchForecast(city));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="input-group mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Inserisci una città..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="btn btn-primary" onClick={handleSearch}>
        Cerca
      </button>
    </div>
  );
};
