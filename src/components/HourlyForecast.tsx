import moment from "moment";

import useUiStore from "../stores/uiStore";
import useWeatherStore from "../stores/weatherStore";

import { getIconURL } from "../utils/utils";

import Card from "./Card";
import Dropdown from "./Dropdown";

const HourlyForecast: React.FC = () => {
  const { data, loading } = useWeatherStore();
  const { selectedDay, setSelectedDay, units } = useUiStore();

  const options = loading
    ? [{ field: "-", value: "" }]
    : data!.forecast!.forecastday.map((forecast) => {
        const date = moment(forecast.date).format("YYYY-MM-DD");
        return { field: moment(forecast.date).format("dddd"), value: date };
      });

  const localtime = data?.location.localtime;
  const loadingItems: number[] = [];

  for (let i = 0; i < 6; i++) {
    loadingItems.push(i);
  }

  return (
    <div className="bg-neutral-800 rounded-3xl overflow-hidden xl:h-full h-120">
      <div className="p-6 h-full overflow-auto scrollbar min-h-0">
        <div className="flex items-center justify-between pb-4">
          <h3 className="text-[1.25rem]">Hourly forecast</h3>
          <Dropdown
            buttonText={loading ? "-" : moment(selectedDay).format("dddd")}
            options={options}
            onChange={(value) => setSelectedDay(value)}
            value={selectedDay}
            disabled={loading}
          />
        </div>
        <div className="flex flex-col gap-4">
          {loading && loadingItems.map((i) => <ForecastCard key={i} loading />)}
          {!loading &&
            data &&
            data
              .forecast!.forecastday.find((day) => moment(day.date).isSame(selectedDay))
              ?.hour.filter(
                (hour) =>
                  !(
                    moment(selectedDay).date() === moment(localtime).date() &&
                    moment(hour.time).hour() < moment(localtime).hour()
                  ),
              )
              .map((hour) => {
                const time = moment(hour?.time).format("h A");
                const iconURL = getIconURL(hour.condition.code);
                const temp = units.temp === "f" ? hour.temp_f : hour.temp_c;

                return (
                  <ForecastCard
                    key={time}
                    alt={hour.condition.text}
                    iconURL={iconURL}
                    temp={temp}
                    time={time}
                    loading={false}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
};

interface ForecastCardProps {
  loading: boolean;
  alt?: string;
  iconURL?: string;
  temp?: number;
  time?: string;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ alt, iconURL, loading, temp, time }) => {
  return (
    <Card bg="700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {loading ? (
            <div className="h-5"></div>
          ) : (
            <>
              <img src={iconURL} alt={alt} height={40} width={40} />
              <h4 className="text-[1.25rem]">{time}</h4>
            </>
          )}
        </div>
        <div>{loading ? <div className="h-5"></div> : <h4 className="text-[1.25rem]">{temp}°</h4>}</div>
      </div>
    </Card>
  );
};

export default HourlyForecast;
