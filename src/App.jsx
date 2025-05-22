import "./App.css";
import CurrentWeather from "./components/currentWeather";
import Forecast from "./components/forecast";
import Search from "./components/search";

function App() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Search />
          <CurrentWeather />
          <Forecast />
        </div>
      </div>
    </div>
  );
}

export default App;
