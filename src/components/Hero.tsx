import moment from "moment";

import useWeatherStore from "../stores/weatherStore";
import useUiStore from "../stores/uiStore";
import Card from "./Card";
import { getIconURL } from "../utils/utils";

import heroDesktop from "../assets/bg-today-large.svg";
import heroMobile from "../assets/bg-today-small.svg";

const Hero: React.FC = () => {
  const { data, loading } = useWeatherStore();
  const { units } = useUiStore();

  const currentTemp = data ? (units.temp === "c" ? data?.current.feelslike_c : data?.current.feelslike_f) : "";
  const iconURL = data ? getIconURL(data.current.condition.code) : "";

  return (
    <Card className="relative flex flex-col items-center px-6 py-20 gap-6 min-h-72 md:flex-row md:text-left text-center justify-between overflow-hidden">
      <img src={heroMobile} alt="" className="absolute inset-0 h-full object-cover sm:hidden" />
      <img src={heroDesktop} alt="" className="absolute inset-0 w-full h-full object-cover hidden sm:block" />

      {loading ? (
        <div className="relative z-10 w-full flex flex-col justify-between items-center gap-6 md:flex-row">
          <div className="flex flex-col justify-center gap-4">
            <div className="h-7 w-65 bg-neutral-300 rounded animate-pulse"></div>
            <div className="flex justify-center md:justify-start">
              <div className="h-5 w-50 bg-neutral-300 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 bg-neutral-300 rounded-full animate-pulse"></div>
            <div className="h-24 w-34 bg-neutral-300 rounded animate-pulse"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="relative z-10">
            <h2 className="text-[1.75rem] font-bold">
              {data?.location.name}, {data?.location.country}
            </h2>
            <h4 className="text-[1.125rem]">{moment(data?.location.localtime).format("dddd, MMMM D, YYYY")}</h4>
          </div>
          <div className="relative z-10 flex gap-4">
            <img src={iconURL} alt={data?.current.condition.text} width={80} height={80} className="self-center" />
            <h1 className="text-8xl">
              <span className="italic">{currentTemp}°</span>
            </h1>
          </div>
        </>
      )}
    </Card>
  );
};

export default Hero;
