import moment from "moment";

import useWeatherStore from "../stores/weatherStore";
import useUiStore from "../stores/uiStore";
import Card from "./Card";
import { getIconURL } from "../utils/utils";

const Hero: React.FC = () => {
  const { data } = useWeatherStore();
  const { units } = useUiStore();

  if (!data) return null;

  const currentTemp = units.temp === "c" ? data.current.feelslike_c : data.current.feelslike_f;
  const iconURL = getIconURL(data.current.condition.code);

  return (
    <Card className="flex flex-col items-center justify-between text-center px-6 py-20 gap-6 md:flex-row md:text-left relative hero">
      <div>
        <h2 className="text-[1.75rem] font-bold">{data.location.name}, {data.location.region}</h2>
        <h4 className="text-[1.125rem]">{moment(data.location.localtime).format("dddd, MMMM d, YYYY")}</h4>
      </div>
      <div className="flex gap-4">
        <img src={iconURL} alt={data.current.condition.text} width={80} height={80} />
        <h1 className="text-8xl"><span className="italic">{currentTemp}</span> °</h1>
      </div>
    </Card>
  );
};

export default Hero;
