import { useEffect } from "react";

import useWeatherStore from "./stores/weatherStore";
import DailyForecastStack from "./components/DailyForecastStack";
import CurrentWeatherStack from "./components/CurrentWeatherStack";
import HourlyForecast from "./components/HourlyForecast";
import Hero from "./components/Hero";
import Dropdown from "./components/Dropdown";
import Logo from "./assets/Logo";
import useUiStore, { getUnitSystem } from "./stores/uiStore";
import Search from "./components/Search";

function App() {
  const { data, error, fetchForecast, geolocation, getGeolocation, loading } = useWeatherStore();
  const { units, setUnit, setUnitSystem } = useUiStore();
  const unitSystem = getUnitSystem(units);

  useEffect(() => {
    if (!geolocation) {
      getGeolocation();
    }

    if (geolocation) {
      fetchForecast(geolocation);
    }
  }, [getGeolocation, geolocation, fetchForecast]);

  if (error) {
    return (
      <div className="h-lvh flex flex-col gap-2 justify-center text-center">
        <h1 className="text-6xl font-bold">Something went wrong</h1>
        <h3 className="text-2xl">Please try again in a few moments</h3>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-12 gap-8 p-4 md:p-6 xl:p-2">
      <div className="col-span-12">
        <div className="flex justify-between items-center">
          <div>
            <Logo />
          </div>
          <div>
            <Dropdown
              buttonText="Units"
              multi
              showCheckmark
              options={[
                {
                  value: unitSystem === "mixed" ? "imperial" : unitSystem === "metric" ? "imperial" : "metric",
                  field:
                    unitSystem === "mixed"
                      ? "Use Imperial"
                      : `Switch to ${unitSystem === "metric" ? "Imperial" : "Metric"}`,
                },
                { value: "", field: "Temperature", disabled: true },
                { value: "c", field: "Celsius (°C)" },
                { value: "f", field: "Fahrenheit (°F)" },
                { value: "", field: "Wind Speed", disabled: true },
                { value: "km", field: "km/h" },
                { value: "mph", field: "mph" },
                { value: "", field: "Precipitation", disabled: true },
                { value: "mm", field: "Millimeters (mm)" },
                { value: "in", field: "Inches (in)" },
              ]}
              value={[unitSystem, units.temp, units.windSpeed, units.precipitation]}
              onChange={(value) => {
                if (value === "imperial" || value === "metric") {
                  setUnitSystem(value);
                  return;
                }

                if (value === "c" || value === "f") {
                  setUnit("temp", value);
                } else if (value === "km" || value === "mph") {
                  setUnit("windSpeed", value);
                } else if (value === "in" || value === "mm") {
                  setUnit("precipitation", value);
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-span-12 my-16">
        <h1 className="text-[3.25rem] text-center font-bold"> How's the sky looking today?</h1>
      </div>
      <div className="col-span-12 lg:col-start-4 lg:col-end-10 mb-12">
        <Search />
      </div>
      {!loading && !data ? (
        <div className="col-span-12 text-center">
          <h3 className="text-3xl font-bold">Search for a location</h3>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-8 col-span-12 xl:col-span-8">
            <div className="flex flex-col gap-8">
              <Hero />
              <CurrentWeatherStack />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl">Daily forecast</h3>
              <DailyForecastStack />
            </div>
          </div>
          <div className="col-span-12 xl:col-span-4 xl:relative">
            <div className="xl:absolute xl:inset-0">
              <HourlyForecast />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
