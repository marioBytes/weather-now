import Card from "./Card";

import useWeatherStore from "../stores/weatherStore";

interface CurrentWeatherCardProps {
  title: string;
  value: string;
}

const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ title, value }) => {
  const { loading } = useWeatherStore();

  return (
    <Card className="col-span-3 md:col-span-3">
      <div className="flex flex-col gap-4">
        <h3 className="text-xl text-neutral-300">{title}</h3>
        <h2 className="text-3xl font-light">{loading ? "-" : value}</h2>
      </div>
    </Card>
  );
};

export default CurrentWeatherCard;
