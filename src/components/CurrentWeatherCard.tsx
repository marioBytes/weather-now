import Card from "./Card";

interface CurrentWeatherCardProps {
  title: string;
  value: string;
}

const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ title, value }) => {
  return (
    <CurrentWeatherCardContainer>
      <h3 className="text-xl text-neutral-300">{title}</h3>
      <h2 className="text-3xl font-light">{value}</h2>
    </CurrentWeatherCardContainer>
  );
};

interface LoadingCurrentWeatherCardProps {
  title: string;
}

export const LoadingCurrentWeatherCard: React.FC<LoadingCurrentWeatherCardProps> = ({ title }) => {
  return (
    <CurrentWeatherCardContainer>
      <h3 className="text-xl text-neutral-300">{title}</h3>
      <div className="my-4.25 h-0.5 w-4 bg-neutral-200"></div>
    </CurrentWeatherCardContainer>
  );
};

interface LoadingCurrentWeatherCardContainerProps {
  children: React.ReactNode;
}

const CurrentWeatherCardContainer: React.FC<LoadingCurrentWeatherCardContainerProps> = ({ children }) => {
  return (
    <Card className="col-span-3 md:col-span-3">
      <div className="flex flex-col gap-4">{children}</div>
    </Card>
  );
};

export default CurrentWeatherCard;
