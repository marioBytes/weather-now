import Card from "./Card";
import moment from "moment";

import { getIconURL } from "../utils/utils";

interface DailyForecastCardProps {
  date: string;
  code: number;
  low: number;
  high: number;
  loading: boolean;
}

const DailyForecastCard: React.FC<DailyForecastCardProps> = ({ date, code, loading, low, high }) => {
  const iconUrl = getIconURL(code);
  const dayOfWeek = moment(date).format("ddd");

  return (
    <Card className="px-2.5 py-4">
      <div className="flex flex-col gap-4 items-center">
        {loading ? (
          <>
            <div className="h-7"></div>
            <div className="h-15"></div>
            <div className="h-6"></div>
          </>
        ) : (
          <>
            <h3 className="text-lg font-dm-sans">{dayOfWeek}</h3>
            <img className="text-center" src={iconUrl} alt="icon" height={60} width={60} />
            <div className="flex justify-between w-full">
              <p>{high}°</p>
              <p>{low}°</p>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default DailyForecastCard;
