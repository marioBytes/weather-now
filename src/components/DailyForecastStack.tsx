import useWeatherStore from "../stores/weatherStore";
import useUiStore from "../stores/uiStore";

import DailyForecastCard from "./DailyForecastCard";

const DailyForecastStack: React.FC = () => {
  const { data } = useWeatherStore();
  const { units } = useUiStore();

  if (!data) return null;
  if (!data.forecast) return null;

  const forecast = data.forecast.forecastday.map((forecast) => {
    const high = units.temp === "f" ? forecast.day.maxtemp_f : forecast.day.maxtemp_c;
    const low = units.temp === "f" ? forecast.day.mintemp_f : forecast.day.mintemp_c;

    return (
      <DailyForecastCard
        key={forecast.date}
        date={forecast.date}
        code={forecast.day.condition.code}
        high={high}
        low={low}
      />
    );
  });

  return <div className="grid grid-cols-3 gap-4 md:grid-cols-7">{forecast}</div>;
};

export default DailyForecastStack;
