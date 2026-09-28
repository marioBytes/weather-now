import CurrentWeatherCard, { LoadingCurrentWeatherCard } from "./CurrentWeatherCard";

import useWeatherStore from "../stores/weatherStore";
import useUiStore from "../stores/uiStore";

const CurrentWeatherStack: React.FC = () => {
  const { data, loading } = useWeatherStore();
  const { units } = useUiStore();

  if (loading) {
    return (
      <CurrentWeatherStackContainer>
        {["Feels Like", "Humidity", "Wind", "Precipitation"].map((title) => {
          return <LoadingCurrentWeatherCard key={title} title={title} />;
        })}
      </CurrentWeatherStackContainer>
    );
  }

  const feelsLike = data ? (units.temp === "c" ? `${data.current.feelslike_c}°` : `${data.current.feelslike_f}°`) : "-";
  const wind = data
    ? units.windSpeed === "km"
      ? `${data.current.wind_kph} km/h`
      : `${data.current.wind_mph} mph`
    : "-";
  const humidity = data ? `${data.current.humidity}%` : "-";
  const precipitation = data
    ? units.precipitation === "mm"
      ? `${data.current.precip_mm} mm`
      : `${data.current.precip_in} in`
    : "-";

  return (
    <CurrentWeatherStackContainer>
      <CurrentWeatherCard title="Feels Like" value={feelsLike} />
      <CurrentWeatherCard title="Humidity" value={humidity} />
      <CurrentWeatherCard title="Wind" value={wind} />
      <CurrentWeatherCard title="Precipitation" value={precipitation} />
    </CurrentWeatherStackContainer>
  );
};

interface CurrentWeatherStackContainerProps {
  children: React.ReactNode;
}

const CurrentWeatherStackContainer: React.FC<CurrentWeatherStackContainerProps> = ({ children }) => {
  return <div className="grid grid-cols-6 gap-4 md:grid-cols-12 lg:gap-6 md:gap-5 w-full">{children}</div>;
};

export default CurrentWeatherStack;
