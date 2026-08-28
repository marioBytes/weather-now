import CurrentWeatherCard from "./CurrentWeatherCard";

import useWeatherStore from "../stores/weatherStore";
import useUiStore from "../stores/uiStore";

const CurrentWeatherStack: React.FC = () => {
  const { data } = useWeatherStore();
  const { unitSystem } = useUiStore();

  const feelsLike = data
    ? unitSystem === "metric"
      ? `${data.current.feelslike_c}°`
      : `${data.current.feelslike_f}°`
    : "-";
  const wind = data ? (unitSystem === "metric" ? `${data.current.wind_kph} m/s` : `${data.current.wind_mph} mph`) : "-";
  const humidity = data ? `${data.current.humidity}%` : "-";
  const precipitation = data
    ? unitSystem === "metric"
      ? `${data.current.precip_mm} mm`
      : `${data.current.precip_in} in`
    : "-";

  return (
    <div className="grid grid-cols-6 gap-4 md:grid-cols-12 lg:gap-6 md:gap-5 w-full">
      <CurrentWeatherCard title="Feels Like" value={feelsLike} />
      <CurrentWeatherCard title="Humidity" value={humidity} />
      <CurrentWeatherCard title="Wind" value={wind} />
      <CurrentWeatherCard title="Precipitation" value={precipitation} />
    </div>
  );
};

export default CurrentWeatherStack;
