import { conditionList } from './conditionList';

export function getIconURL(code: number): string {
  const iconCode = conditionList.find((condition) => condition.code === code)

  if (!iconCode) {
    console.error(`No icon found for code ${code}`);

    return "";
  }

  return `https://cdn.weatherapi.com/weather/64x64/day/${iconCode.icon}.png`;
}
