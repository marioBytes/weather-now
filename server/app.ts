import express, { type Express, type Request, type Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import instance from "./instance.ts";
import { type Current, type Forecast, type ForecastDay, type Hour, type Location } from "./types/weather.ts";

dotenv.config();
const app: Express = express();

app.use(cors());

interface WeatherData {
  current: Current;
  forecast: Forecast;
  location: Location;
}

app.get("/forecast", async (req: Request, res: Response) => {
  try {
    const response = await instance.get("/forecast.json", {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: req.query.coords,
        days: req.query.days || 7,
      },
    });

    const weatherData: WeatherData = {
      current: {
        feelslike_c: Math.round(response.data.current.feelslike_c),
        feelslike_f: Math.round(response.data.current.feelslike_f),
        humidity: response.data.current.humidity,
        is_day: response.data.current.is_day,
        last_updated: response.data.current.last_updated,
        precip_in: response.data.current.precip_in,
        precip_mm: response.data.current.precip_mm,
        temp_c: Math.round(response.data.current.temp_c),
        temp_f: Math.round(response.data.current.temp_f),
        wind_kph: Math.round(response.data.current.wind_kph),
        wind_mph: Math.round(response.data.current.wind_mph),
        condition: {
          ...response.data.current.condition,
          icon: `https:${response.data.current.condition.icon}`,
        },
      },
      forecast: {
        forecastday: response.data.forecast.forecastday.map((fd: ForecastDay) => {
          return {
            ...fd,
            day: {
              maxtemp_c: Math.round(fd.day.maxtemp_c),
              maxtemp_f: Math.round(fd.day.maxtemp_f),
              mintemp_c: Math.round(fd.day.mintemp_c),
              mintemp_f: Math.round(fd.day.mintemp_f),
              condition: {
                ...fd.day.condition,
                icon: `https:${fd.day.condition.icon}`,
              },
            },
            hour: fd.hour.map((h: Hour) => ({
              temp_c: Math.round(h.temp_c),
              temp_f: Math.round(h.temp_f),
              time: h.time,
              condition: {
                ...h.condition,
                icon: `https:${h.condition.icon}`,
              },
            })),
          };
        }),
      },
      location: response.data.location,
    };

    res.json({ data: weatherData });
  } catch (error) {
    res.json({ error: "Internal Error" });
  }
});

app.get("/search", async (req: Request, res: Response) => {
  try {
    const response = await instance.get("/search.json", {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: req.query.q,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.json({ error: "Internal Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
