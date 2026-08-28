import Card from "./Card";

interface CurrentWeatherCardProps {
  title: string;
  value: string;
}

const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ title, value }) => {
  return (
    <Card className="col-span-3 md:col-span-3">
      <div className="flex flex-col gap-4">
        <h3 className="text-xl text-neutral-300">{title}</h3>
        <h2 className="text-3xl font-light">{value}</h2>
      </div>
    </Card>
  );
};

export default CurrentWeatherCard;
