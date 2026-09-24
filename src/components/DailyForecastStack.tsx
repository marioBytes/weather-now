import useWeatherStore from "../stores/weatherStore";
import useUiStore from "../stores/uiStore";

import DailyForecastCard, { LoadingDailyForecastCard } from "./DailyForecastCard";

const DailyForecastStack: React.FC = () => {
  const { data, loading } = useWeatherStore();
  const { units } = useUiStore();

  if (loading) {
    return (
      <DailyForecastCardContainer>
        {Array.from({ length: 7 }, (_, i) => (
          <LoadingDailyForecastCard key={i} />
        ))}
      </DailyForecastCardContainer>
    );
  }

  const forecast = data?.forecast?.forecastday.map((forecast) => {
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

  return <DailyForecastCardContainer>{forecast}</DailyForecastCardContainer>;
};

interface DailyForecastCardContainerProps {
  children: React.ReactNode;
}

const DailyForecastCardContainer: React.FC<DailyForecastCardContainerProps> = ({ children }) => {
  return <div className="grid grid-cols-3 gap-4 md:grid-cols-7">{children}</div>;
};

export default DailyForecastStack;
