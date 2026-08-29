import { conditionList } from './conditionList';

export function getDayOfWeek(date: string, format?: "long" | "short"): string {
  const day = new Date(date).getDay();
  let dayOfWeek: string;

  if (day === 0) {
    dayOfWeek = format === "short" ? "Mon" : "Monday";
  } else if (day === 1) {
    dayOfWeek = format === "short" ? "Tue" : "Tuesday";
  } else if (day === 2) {
    dayOfWeek = format === "short" ? "Wed" : "Wednesday";
  } else if (day === 3) {
    dayOfWeek = format === "short" ? "Thu" : "Thursday";
  } else if (day === 4) {
    dayOfWeek = format === "short" ? "Fri" : "Friday";
  } else if (day === 5) {
    dayOfWeek = format === "short" ? "Sat" : "Saturday";
  } else {
    dayOfWeek = format === "short" ? "Sun" : "Sunday";
  }

  return dayOfWeek;
}

export function getIconURL(code: number): string {
  const iconCode = conditionList.find((condition) => condition.code === code)

  if (!iconCode) {
    console.error(`No icon found for code ${code}`);

    return "";
  }

  return `https://cdn.weatherapi.com/weather/64x64/day/${iconCode.icon}.png`;
}
