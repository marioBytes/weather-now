import Card from "./Card";

import { getDayOfWeek, getIconURL } from "../utils/utils";

interface DailyForecastCardProps {
  date: string;
  code: number;
  low: number;
  high: number;
}

const DailyForecastCard: React.FC<DailyForecastCardProps> = ({ date, code, low, high }) => {
  const iconUrl = getIconURL(code);
  const dayOfWeek = getDayOfWeek(date, "short");

  return (
    <Card className="px-2.5 py-4">
      <div className="flex flex-col gap-4 items-center">
        <h3 className="text-lg font-dm-sans">{dayOfWeek}</h3>
        <img className="text-center" src={iconUrl} alt="icon" height={60} width={60} />
        <div className="flex justify-between w-full">
          <p>{high}°</p>
          <p>{low}°</p>
        </div>
      </div>
    </Card>
  );
};

export default DailyForecastCard;
