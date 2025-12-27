import type { WeatherData } from "./weather.types";
import { WEATHER_API_URL } from "./weather.constants";

export const fetchCurrentWeather = async (): Promise<WeatherData> => {
  if (!navigator.geolocation) {
    throw new Error("Geolocation not supported");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const { latitude, longitude } = coords;

          const response = await fetch(
            `${WEATHER_API_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`,
          );

          if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
          }

          const data = await response.json();
          const current = data.current_weather;

          const weatherData: WeatherData = {
            location: data.timezone?.split("/")?.[1] ?? "Unknown",
            temperature: Math.round(current.temperature * 1.8 + 32),
            temperatureCelsius: Math.round(current.temperature),
              time: current.toLocaleString([], {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
            feelsLike: Math.round(current.temperature * 1.8 + 32),
            windSpeed: Math.round(current.windspeed * 0.621371),
            humidity: 50,
            uvIndex: 5,
            icon: "cloudy",
            condition: "Cloudy",
          };

          resolve(weatherData);
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        reject(new Error(`Geolocation error: ${error.message}`));
      },
    );
  });
};
