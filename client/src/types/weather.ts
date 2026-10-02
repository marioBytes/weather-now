export interface WeatherData {
  current: Current;
  location: Location;
  forecast?: Forecast;
}

export interface SearchLocation {
  country: string;
  id: number;
  lat: number;
  lon: number;
  region: string;
  url: string;
  name: string;
}

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime: string;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export interface Current {
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  feelslike_c: number;
  feelslike_f: number;
  last_updated: string;
}

export interface Day {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  condition: Condition;
}

export interface Hour {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
}

export interface ForecastDay {
  date: string;
  day: Day;
  hour: Hour[];
}

export interface Forecast {
  forecastday: ForecastDay[];
}
