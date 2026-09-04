import { useEffect, useState } from "react";

import "./App.css";

import useWeatherStore from "./stores/weatherStore";
import DailyForecastStack from "./components/DailyForecastStack";
import CurrentWeatherStack from "./components/CurrentWeatherStack";
import HourlyForecast from "./components/HourlyForecast";
import Hero from "./components/Hero";
import Dropdown from "./components/Dropdown";
import Logo from "./assets/Logo";
import useUiStore, { getUnitSystem } from "./stores/uiStore";
import Input from "./components/Input";
import SearchIcon from "./assets/SearchIcon";
import Button from "./components/Button";

function App() {
  const { data, loading, error, fetchForecast, geolocation, getGeolocation, searchLocation } = useWeatherStore();
  const { units, setUnit, setUnitSystem } = useUiStore();
  const [searchTerm, setSearchTerm] = useState("");
  const unitSystem = getUnitSystem(units);

  useEffect(() => {
    if (!geolocation) {
      getGeolocation();
    }

    fetchForecast();
  }, [getGeolocation, geolocation, fetchForecast]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data</div>;
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
                  value:
                    unitSystem === "mixed"
                      ? "imperial"
                      : unitSystem === "metric"
                        ? "imperial"
                        : "metric",
                  field: unitSystem === "mixed" ? "Use Imperial" : `Switch to ${unitSystem === "metric" ? "Imperial" : "Metric"}`,
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
      <div className="col-span-12 col-start-4 col-end-10 mb-12">
        <form className="flex gap-4" onSubmit={(event) => event.preventDefault()}>
          <Input
            icon={<SearchIcon />}
            placeholder="Search for a place..."
            onChange={(event) => setSearchTerm(event.target.value)}
            value={searchTerm}
          />
          <Button onClick={() => searchLocation(searchTerm)}>Search</Button>
        </form>
      </div>
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
    </div>
  );
}

export default App;
