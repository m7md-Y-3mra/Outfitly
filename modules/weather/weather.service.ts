import { WeatherData } from "./weather.types";

export class WeatherService {
  private static readonly API_URL = "https://api.open-meteo.com/v1/forecast";

  static async fetchCurrentWeather(): Promise<WeatherData> {
    if (!navigator.geolocation) {
      throw new Error("Geolocation not supported");
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `${this.API_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`,
            );

            if (!response.ok) {
              throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            const current = data.current_weather;

            // Transform API data to WeatherData
            const weatherData: WeatherData = {
              location: data.timezone.split("/")[1] || "Unknown", // "timezone": "Asia/Gaza",
              temperature: Math.round(current.temperature * 1.8 + 32), // Convert to °F
              temperatureCelsius: Math.round(current.temperature),
              time: current.time,
              feelsLike: Math.round(current.temperature * 1.8 + 32), // Approx
              windSpeed: Math.round(current.windspeed * 0.621371), // Convert km/h to mph
              // Fallback; could map from weathercode if expanded
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
  }
}
