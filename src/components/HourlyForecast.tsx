import moment from "moment";

import useUiStore from "../stores/uiStore";
import useWeatherStore from "../stores/weatherStore";

import { getIconURL } from "../utils/utils";

import Card from "./Card";

const HourlyForecast: React.FC = () => {
  const { data } = useWeatherStore();
  const { selectedDay, setSelectedDay, unitSystem } = useUiStore();

  if (!data) return null;

  return (
    <div className="bg-neutral-800 rounded-3xl overflow-hidden xl:h-full h-120">
      <div className="p-6 h-full overflow-auto scrollbar min-h-0">
        <div className="flex items-center justify-between pb-4">
          <h3 className="text-[1.25rem]">Hourly forecast</h3>
          <select
            className="bg-neutral-600 py-2 px-4 rounded-lg"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            {data.forecast &&
              data.forecast.forecastday.map((forecast) => {
                const day = moment(forecast.date).format("dddd");

                return (
                  <option
                    className="bg-neutral-600 text-base p-4 aria-selected:bg-neutral-700 hover:bg-neutral-700"
                    value={moment(forecast.date).format("YYYY-MM-DD")}
                    key={moment(forecast.date).format("YYYY-MM-DD")}
                  >
                    {day}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="flex flex-col gap-4">
          {data.forecast &&
            data.forecast.forecastday
              .find((day) => moment(day.date).isSame(selectedDay))
              ?.hour.map((hour) => {
                if (moment(selectedDay).date() === moment().date() && moment(hour.time).hour() <= moment().hour()) {
                  return;
                }

                const time = moment(hour.time).format("h A");
                const iconURL = getIconURL(hour.condition.code);
                const temp = unitSystem === "imperial" ? hour.temp_f : hour.temp_c;

                return (
                  <Card key={hour.time} bg="700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={iconURL} alt={hour.condition.text} width={40} height={40} />
                        <h4 className="text-[1.25rem]">{time}</h4>
                      </div>
                      <div>
                        <h4 className="text-[1.25rem]">{temp}°</h4>
                      </div>
                    </div>
                  </Card>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;
